export const retry = async <T>(
  func: () => Promise<T>,
  maxAttempts = 3,
  delayMs = 250,
): Promise<T | undefined> => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const result = await func();
      return result;
    } catch (error) {
      if (attempt < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      } else {
        throw error;
      }
    }
  }

  return;
};
