"use client";

import { useRef, useState, useEffect } from "react";

const CAMERA_POSITIONS: Record<"isometric" | "front" | "side" | "top", [number, number, number]> = {
  isometric: [5, 5, 5],
  front:     [0, 2, 8],
  side:      [8, 2, 0],
  top:       [0, 10, 0],
};
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Grid, Environment } from "@react-three/drei";
import * as THREE from "three";

function LoadingOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-card">
      <div className="flex flex-col items-center gap-3">
        <div className="h-5 w-5 animate-spin rounded-full border border-border border-t-[#4ade80]" />
        <span
          className="text-label uppercase tracking-ui text-muted-foreground"
          style={{ fontFamily: "var(--font-dm-mono), monospace" }}
        >
          Loading model…
        </span>
      </div>
    </div>
  );
}

function CADModel({
  viewMode,
  measurementMode,
  sectionMode,
}: {
  viewMode: "solid" | "wireframe" | "exploded";
  measurementMode: boolean;
  sectionMode: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current && hovered) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;
    group.clear();

    for (let i = 0; i < 3; i++) {
      const part = new THREE.Group();

      const body = new THREE.Mesh(
        new THREE.BoxGeometry(2, 1.5, 1),
        new THREE.MeshPhongMaterial({
          color: 0x2a5f8f,
          transparent: true,
          opacity: viewMode === "wireframe" ? 0.3 : 0.85,
          wireframe: viewMode === "wireframe",
          shininess: 80,
        }),
      );
      body.position.set(0, i * 2.2, 0);
      body.castShadow = true;
      part.add(body);

      const cap = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.3, 0.2, 16),
        new THREE.MeshPhongMaterial({ color: 0x4ade80, shininess: 150 }),
      );
      cap.position.set(1.2, i * 2.2, 0);
      cap.rotation.z = Math.PI / 2;
      part.add(cap);

      if (measurementMode) {
        const dot = new THREE.MeshPhongMaterial({ color: 0xff4444 });
        [
          [0, i * 2.2 + 0.75, 0.5],
          [0, i * 2.2 - 0.75, 0.5],
          [1, i * 2.2, 0.5],
          [-1, i * 2.2, 0.5],
        ].forEach(([x, y, z]) => {
          const pt = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), dot);
          pt.position.set(x, y, z);
          part.add(pt);
        });
      }

      if (sectionMode) {
        const plane = new THREE.Mesh(
          new THREE.PlaneGeometry(4, 3),
          new THREE.MeshBasicMaterial({
            color: 0x4ade80,
            transparent: true,
            opacity: 0.15,
            side: THREE.DoubleSide,
          }),
        );
        plane.position.set(0, i * 2.2, 0);
        plane.rotation.x = Math.PI / 2;
        part.add(plane);
      }

      if (viewMode === "exploded") {
        part.position.x = (i - 1) * 0.6;
        part.position.z = (i - 1) * 0.3;
      }

      group.add(part);
    }
  }, [viewMode, measurementMode, sectionMode]);

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
}

function CameraController({
  position,
}: {
  position: [number, number, number];
}) {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(...position);
    camera.lookAt(0, 2, 0);
    camera.updateProjectionMatrix();
  }, [position, camera]);
  return null;
}

function ToolButton({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`border px-2.5 py-1 text-label uppercase tracking-ui transition-colors ${
        active
          ? "border-feedback-success text-feedback-success"
          : "border-border text-muted-foreground hover:border-border hover:text-secondary-foreground"
      }`}
      style={{ fontFamily: "var(--font-dm-mono), monospace" }}
    >
      {children}
    </button>
  );
}

export default function CadViewer({ height = 399 }: { height?: number }) {
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"solid" | "wireframe" | "exploded">(
    "solid",
  );
  const [controlMode, setControlMode] = useState<"orbit" | "pan" | "zoom">(
    "orbit",
  );
  const [measurementMode, setMeasurementMode] = useState(false);
  const [sectionMode, setSectionMode] = useState(false);
  const [cameraView, setCameraView] = useState<
    "isometric" | "front" | "side" | "top"
  >("isometric");
  const [cameraPosition, setCameraPosition] = useState<
    [number, number, number]
  >([5, 5, 5]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  function changeView(view: typeof cameraView) {
    setCameraView(view);
    setCameraPosition(CAMERA_POSITIONS[view]);
  }

  function reset() {
    setControlMode("orbit");
    setMeasurementMode(false);
    setSectionMode(false);
    changeView("isometric");
  }

  return (
    <div
      className="relative overflow-hidden border border-border bg-background"
      style={{ height }}
    >
      {loading ? (
        <LoadingOverlay />
      ) : (
        <>
          <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
            <CameraController position={cameraPosition} />
            <ambientLight intensity={0.25} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <directionalLight position={[-10, -10, -5]} intensity={0.2} />
            <Grid
              position={[0, -1, 0]}
              args={[20, 20]}
              cellSize={1}
              cellThickness={0.4}
              cellColor="#1c1c1c"
              sectionSize={5}
              sectionThickness={0.8}
              sectionColor="#2a2a2a"
              fadeDistance={25}
              infiniteGrid
            />
            <CADModel
              viewMode={viewMode}
              measurementMode={measurementMode}
              sectionMode={sectionMode}
            />
            <OrbitControls
              enablePan={controlMode === "pan"}
              enableZoom={controlMode === "zoom" || controlMode === "orbit"}
              enableRotate={controlMode === "orbit"}
              enableDamping
              dampingFactor={0.08}
              target={[0, 2, 0]}
              minDistance={3}
              maxDistance={20}
            />
            <Environment preset="night" />
          </Canvas>

          {/* Top-left: interaction mode */}
          <div className="absolute left-3 top-3 flex gap-1">
            {(["orbit", "pan", "zoom"] as const).map((m) => (
              <ToolButton
                key={m}
                active={controlMode === m}
                onClick={() => setControlMode(m)}
              >
                {m}
              </ToolButton>
            ))}
          </div>

          {/* Top-right: analysis + camera */}
          <div className="absolute right-3 top-3 flex gap-1">
            <ToolButton
              active={measurementMode}
              onClick={() => {
                setMeasurementMode(!measurementMode);
                setSectionMode(false);
              }}
            >
              Measure
            </ToolButton>
            <ToolButton
              active={sectionMode}
              onClick={() => {
                setSectionMode(!sectionMode);
                setMeasurementMode(false);
              }}
            >
              Section
            </ToolButton>
            <select
              value={cameraView}
              onChange={(e) => changeView(e.target.value as typeof cameraView)}
              className="border border-border bg-card px-2 py-1 text-label uppercase tracking-ui text-muted-foreground outline-none focus-visible:border-feedback-success"
              style={{ fontFamily: "var(--font-dm-mono), monospace" }}
            >
              {(["isometric", "front", "side", "top"] as const).map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
            <ToolButton onClick={reset}>Reset</ToolButton>
          </div>

          {/* Bottom-left: file info */}
          <div
            className="absolute bottom-3 left-3 text-label text-muted-foreground tracking-ui"
            style={{ fontFamily: "var(--font-dm-mono), monospace" }}
          >
            sample.step · 2.3 MB
          </div>

          {/* Bottom-right: view mode */}
          <div className="absolute bottom-3 right-3 flex gap-1">
            {(["solid", "wireframe", "exploded"] as const).map((m) => (
              <ToolButton
                key={m}
                active={viewMode === m}
                onClick={() => setViewMode(m)}
              >
                {m}
              </ToolButton>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
