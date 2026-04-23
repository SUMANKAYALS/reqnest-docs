import { DocsLayout } from "@/components/DocsLayout";
import { DocPage } from "@/components/DocPage";
import { CodeBlock } from "@/components/CodeBlock";

const requestConfig = `api.get("/users", {
  params: { page: 1, limit: 10 },        // → appended as ?page=1&limit=10
  headers: { Authorization: "Bearer token" },
  timeout: 5000,                          // abort after 5 seconds
  retry: 3,                               // retry up to 3 times on failure
  cache: true,                            // use cachePlugin if registered
  signal: controller.signal,              // manual AbortSignal
  transformRequest: (data) => data,       // transform outgoing body
  transformResponse: (data) => data,      // transform incoming response
});`;

const fullConfig = `interface ReqnestConfig {
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";
  baseURL?: string;

  headers?: Record<string, string>;
  params?: Record<string, any>;
  data?: any;

  timeout?: number;
  signal?: AbortSignal;
  retry?: number;
  cache?: boolean;

  transformRequest?: (data: any) => any;
  transformResponse?: (data: any) => any;
}`;

const response = `interface ReqnestResponse<T = any> {
  data: T;                          // parsed JSON body
  status: number;                   // e.g. 200
  statusText: string;               // e.g. "OK"
  headers: Record<string, string>;  // response headers
  raw: Response;                    // original fetch Response object
}`;

export default function Api() {
  return (
    <DocsLayout>
      <DocPage
        slug="api"
        title="API Reference"
        description="Full reference for the Reqnest public API surface."
      >
        <h2>Request config</h2>
        <p>Pass a config object as the second argument to any request method.</p>
        <CodeBlock language="typescript" code={requestConfig} />

        <h2>Full config type</h2>
        <CodeBlock language="typescript" code={fullConfig} />

        <h2>Response format</h2>
        <p>
          Every successful response is normalized into a{" "}
          <code>ReqnestResponse</code>:
        </p>
        <CodeBlock language="typescript" code={response} />

        <h3>Best practices</h3>
        <ul>
          <li>
            Use <code>params</code> instead of building query strings by hand —
            Reqnest serializes safely.
          </li>
          <li>
            Pass an <code>AbortSignal</code> for any user-cancelable operation
            (search-as-you-type, navigation).
          </li>
          <li>
            Set <code>timeout</code> on every external API call — never trust
            the network.
          </li>
        </ul>
      </DocPage>
    </DocsLayout>
  );
}
