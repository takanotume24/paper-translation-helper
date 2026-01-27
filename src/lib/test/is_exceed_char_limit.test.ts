import { test, expect } from "vitest";
import { is_exceed_char_limit } from "../is_exceed_char_limit.ts";

test(
  "is_exceed_char_limit - Should return true if the number of characters is exceeded",
  () => {
    const sample = "This is a sample text that exceeds the character limit.";
    const result = is_exceed_char_limit(sample, 10);
    expect(result).toBe(true);
  }
);

test(
  "is_exceed_char_limit - Should return false if the number of characters is not exceeded",
  () => {
    const sample = "Short text.";
    const result = is_exceed_char_limit(sample, 200);
    expect(result).toBe(false);
  }
);
