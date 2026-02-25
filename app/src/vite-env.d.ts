declare module '/pagefind/pagefind.js' {
  interface PagefindAPI {
    search: (query: string) => Promise<{
      results: Array<{
        id: string;
        data: () => Promise<{
          meta: { title: string };
          excerpt: string;
          url: string;
        }>;
      }>;
    }>;
    init: () => Promise<void>;
  }
  const pagefind: PagefindAPI;
  export default pagefind;
}
