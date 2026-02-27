import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

export interface ScoreResult {
  dimensions: {
    scientific_clarity: number;
    methodology_rigor: number;
    feasibility: number;
    relevance: number;
    completeness: number;
  };
  composite: number;
  verdict: string;
  flags: string[];
}

interface ScoreRequest {
  title: string;
  abstract: string;
  methodology: string;
  institution?: string;
  category?: string;
}

const SCORING_TOOL: Anthropic.Tool = {
  name: "score_submission",
  description: "Score a science challenge submission against the evaluation rubric",
  input_schema: {
    type: "object" as const,
    properties: {
      scientific_clarity: {
        type: "number",
        description: "0–10: How clearly the scientific problem and goals are stated",
      },
      methodology_rigor: {
        type: "number",
        description: "0–10: Quality of experimental or analytical methodology",
      },
      feasibility: {
        type: "number",
        description: "0–10: Whether the approach is achievable with stated resources",
      },
      relevance: {
        type: "number",
        description: "0–10: Alignment with fluid dynamics research priorities",
      },
      completeness: {
        type: "number",
        description: "0–10: All required fields filled with meaningful content",
      },
      verdict: {
        type: "string",
        description: "One plain-English sentence: the single most important thing the applicant should improve",
      },
      flags: {
        type: "array",
        items: { type: "string" },
        description: "2–4 short, specific, actionable improvement notes",
      },
    },
    required: [
      "scientific_clarity",
      "methodology_rigor",
      "feasibility",
      "relevance",
      "completeness",
      "verdict",
      "flags",
    ],
  },
};

const SYSTEM_PROMPT = `You are an expert reviewer for the Science Fluid Dynamics Challenge.
Your role is to evaluate submission drafts against the challenge rubric and give applicants
honest, actionable feedback so they can improve before submitting.

Rubric dimensions:
- Scientific Clarity (20 pts): Is the problem well-defined? Are goals measurable?
- Methodology Rigor (25 pts): Is the experimental or computational approach sound? Are controls identified?
- Feasibility (20 pts): Can this realistically be achieved? Are resources/scope appropriate?
- Relevance (25 pts): Does it advance fluid dynamics knowledge? Does it fit the challenge focus?
- Completeness (10 pts): Are all required fields present and substantive?

Score strictly — a 7/10 should be genuinely good work. Reserve 9–10 for exceptional submissions.
Flags must be specific and actionable (not "improve methodology" — say "Specify the Reynolds number range").
The verdict must name the single highest-priority issue.`;

export async function POST(req: NextRequest) {
  try {
    const body: ScoreRequest = await req.json();

    if (!body.title || !body.abstract) {
      return NextResponse.json(
        { error: "title and abstract are required" },
        { status: 400 }
      );
    }

    const userMessage = `Please evaluate this submission draft:

**Title:** ${body.title}

**Abstract / Project Description:**
${body.abstract}

**Methodology:**
${body.methodology || "(not provided)"}

**Category:** ${body.category || "Fluid Dynamics"}
**Institution:** ${body.institution || "(not provided)"}`;

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      tools: [SCORING_TOOL],
      tool_choice: { type: "any" },
      messages: [{ role: "user", content: userMessage }],
    });

    // Extract tool_use block
    const toolUse = response.content.find(
      (block): block is Anthropic.ToolUseBlock => block.type === "tool_use"
    );

    if (!toolUse) {
      return NextResponse.json(
        { error: "Model did not return a score" },
        { status: 502 }
      );
    }

    const raw = toolUse.input as {
      scientific_clarity: number;
      methodology_rigor: number;
      feasibility: number;
      relevance: number;
      completeness: number;
      verdict: string;
      flags: string[];
    };

    // Composite: weighted average mapped to /100
    const composite = Math.round(
      (raw.scientific_clarity * 20 +
        raw.methodology_rigor * 25 +
        raw.feasibility * 20 +
        raw.relevance * 25 +
        raw.completeness * 10) /
        10
    );

    const result: ScoreResult = {
      dimensions: {
        scientific_clarity: raw.scientific_clarity,
        methodology_rigor: raw.methodology_rigor,
        feasibility: raw.feasibility,
        relevance: raw.relevance,
        completeness: raw.completeness,
      },
      composite,
      verdict: raw.verdict,
      flags: raw.flags,
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error("[/api/ai/score]", err);
    return NextResponse.json(
      { error: "Scoring failed. Please try again." },
      { status: 500 }
    );
  }
}
