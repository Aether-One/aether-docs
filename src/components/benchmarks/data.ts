export interface BenchmarkTask {
  id: string;
  title: string;
  short: string;
  prNumber: string;
  prTitle: string;
  prUrl: string;
  files: string[];
  bug: string;
  raw: { tokens: number; turns: number; cost: number };
  prompt: { tokens: number; turns: number; cost: number };
}

export const REPO = "axios/axios";
export const REPO_URL = "https://github.com/axios/axios";
export const REPO_DESCRIPTION = "Promise-based HTTP client for the browser and Node.js — one of the most widely used packages in the JS ecosystem.";
export const MODEL = "Claude Sonnet 5";

export const TASKS: BenchmarkTask[] = [
  {
    id: "aggregate-error",
    title: "AxiosError doesn't use AggregateError details",
    short: "AggregateError message",
    prNumber: "#11059",
    prTitle: "fix(core): synthesize AxiosError message from AggregateError.errors",
    prUrl: "https://github.com/axios/axios/pull/11059",
    files: ["lib/core/AxiosError.js"],
    bug: "When the underlying error is an AggregateError (e.g. multiple connection attempts failing), AxiosError.from() used error.message directly — which is empty in that case — instead of synthesizing a message from error.errors[].",
    raw: { tokens: 1_339_195, turns: 29, cost: 0.7897 },
    prompt: { tokens: 315_121, turns: 7, cost: 0.2501 },
  },
  {
    id: "no-proxy-wildcard",
    title: "NO_PROXY doesn't special-case a bare `*` entry in a list",
    short: "NO_PROXY wildcard entry",
    prNumber: "#11053",
    prTitle: "fix: honor wildcard entries in NO_PROXY lists",
    prUrl: "https://github.com/axios/axios/pull/11053",
    files: ["lib/helpers/shouldBypassProxy.js"],
    bug: "NO_PROXY=\"*\" (the whole string) was already handled as \"bypass everything\" — but a bare * as one entry inside a multi-entry list (e.g. \"localhost,*,.example.org\") fell through to normal host/port matching and never bypassed the proxy.",
    raw: { tokens: 412_763, turns: 9, cost: 0.3178 },
    prompt: { tokens: 280_262, turns: 6, cost: 0.2549 },
  },
  {
    id: "data-url-size",
    title: "data: URL size estimate wrong in the maxContentLength guard",
    short: "data: URL size estimate",
    prNumber: "#11061",
    prTitle: "fix(helpers): correct data: URL base64 size estimate for maxContentLength guard",
    prUrl: "https://github.com/axios/axios/pull/11061",
    files: ["lib/helpers/estimateDataURLDecodedBytes.js", "lib/adapters/http.js"],
    bug: "The guard used the final decoded byte length, but it needs to reflect the size of the intermediate buffer allocation Node's base64 decoder actually makes — which can be larger than the final result, letting oversized payloads slip past the guard.",
    raw: { tokens: 4_233_783, turns: 56, cost: 2.4635 },
    prompt: { tokens: 1_094_892, turns: 24, cost: 0.8526 },
  },
  {
    id: "set-serialization",
    title: "toJSONObject doesn't serialize Set values",
    short: "Set serialization",
    prNumber: "#11044",
    prTitle: "fix(utils): serialize Set values in toJSONObject",
    prUrl: "https://github.com/axios/axios/pull/11044",
    files: ["lib/utils.js"],
    bug: "toJSONObject had no branch for Set — a Set nested in a config object fell into the generic object branch instead of being serialized as an array.",
    raw: { tokens: 986_136, turns: 23, cost: 0.5603 },
    prompt: { tokens: 955_236, turns: 22, cost: 0.4984 },
  },
  {
    id: "sync-interceptor",
    title: "A synchronous interceptor error doesn't reject the request",
    short: "Sync interceptor error",
    prNumber: "#11071",
    prTitle: "fix(core): synchronous interceptors swallow errors and proceed with request",
    prUrl: "https://github.com/axios/axios/pull/11071",
    files: ["lib/core/Axios.js"],
    bug: "If a request interceptor threw synchronously, Axios called onRejected without checking it existed or using its result, then called dispatchRequest unconditionally — the request went out anyway instead of rejecting.",
    raw: { tokens: 1_432_372, turns: 26, cost: 0.9321 },
    prompt: { tokens: 486_416, turns: 9, cost: 0.5245 },
  },
];

function sum(pick: (t: BenchmarkTask) => number): number {
  return TASKS.reduce((acc, t) => acc + pick(t), 0);
}

export const TOTALS = {
  raw: {
    tokens: sum((t) => t.raw.tokens),
    turns: sum((t) => t.raw.turns),
    cost: sum((t) => t.raw.cost),
  },
  prompt: {
    tokens: sum((t) => t.prompt.tokens),
    turns: sum((t) => t.prompt.turns),
    cost: sum((t) => t.prompt.cost),
  },
};

export function reduction(before: number, after: number): number {
  return ((before - after) / before) * 100;
}
