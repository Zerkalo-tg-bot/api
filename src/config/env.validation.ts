type EnvRecord = Record<string, unknown>;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function validateEnv(config: EnvRecord): EnvRecord {
  const requiredKeys = ["DATABASE_URL", "OPENAI_API_KEY", "BOT_PROMPT_DOCUMENT_ID", "BOT_DISCLAIMER_DOCUMENT_ID"] as const;

  const missing: string[] = [];
  for (const key of requiredKeys) {
    if (!isNonEmptyString(config[key])) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    throw new Error(["Missing required environment variables:", ...missing.map((k) => `- ${k}`)].join("\n"));
  }

  return config;
}
