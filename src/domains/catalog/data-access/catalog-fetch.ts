export function catalogFetch(
  input: RequestInfo | URL,
  init: RequestInit = {},
): Promise<Response> {
  return fetch(input, {
    ...init,
    headers: {
      "x-api-key": import.meta.env.VITE_API_KEY,
      ...init.headers,
    },
  });
}
