export type HueFetch = <T>(
  endpoint: string,
  config?: RequestInit
) => Promise<T>;

export function hueFetch(baseUrl: string): HueFetch {
  return async function <T>(resource: string, config?: RequestInit) {
    const endpoint = baseUrl + resource;
    try {
      const f = await fetch(endpoint, config);
      const resp: T = await f.json();
      return resp;
    } catch (e) {
      throw new Error(e);
    }
  };
}
