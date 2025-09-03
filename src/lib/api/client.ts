import createClient from "openapi-fetch";
import type { paths } from "./schema";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
export const api = createClient<paths>({ baseUrl });
