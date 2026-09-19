// Vercel serverless function: serves the whole Express app, compiled into
// dist/ by the "vercel-build" script. Local development uses `npm run dev`.
module.exports = require("../dist/index").default;
