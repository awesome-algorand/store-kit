import { vi } from "vitest";

export function createMockFetch() {
  const mockFetch = vi.fn();
  mockFetch.mockImplementation(async (url: string) => {
    console.log(`TODO, fetch mock with ${url}`);
    throw new Error("NOT IMPLEMENTED");
  });
  return mockFetch;
}
