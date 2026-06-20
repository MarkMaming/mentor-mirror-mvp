export type RagContext = {
  snippets: string[];
  source: "mock" | "future-rag";
};

export async function getRagContext(): Promise<RagContext> {
  return {
    snippets: [],
    source: "mock",
  };
}
