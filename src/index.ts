// Serverless entry point (Vercel). Local development uses server.ts instead.
import { createApp } from "./app";
import { getApiRoutes } from "./routes";

const app = createApp(getApiRoutes());

export default app;
