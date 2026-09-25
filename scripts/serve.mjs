import { createReadStream, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const root = join(process.cwd(), "out");
const port = Number(process.env.PORT ?? 3000);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

function resolveFile(pathname) {
  const decoded = decodeURIComponent(pathname.split("?")[0]);
  const safePath = normalize(decoded).replace(/^(\.\.(\/|\\|$))+/, "");
  const base = join(root, safePath);
  const candidates = extname(base)
    ? [base]
    : [base, `${base}.html`, join(base, "index.html")];

  for (const candidate of candidates) {
    try {
      if (statSync(candidate).isFile()) return candidate;
    } catch {
      // Try the next static-export path shape.
    }
  }
  return null;
}

createServer((request, response) => {
  const file = resolveFile(request.url ?? "/");

  if (!file) {
    const notFound = join(root, "404.html");
    response.writeHead(404, { "Content-Type": contentTypes[".html"] });
    createReadStream(notFound).pipe(response);
    return;
  }

  response.writeHead(200, {
    "Content-Type": contentTypes[extname(file)] ?? "application/octet-stream",
    "Cache-Control": file.includes(`${join(root, "_next")}`)
      ? "public, max-age=31536000, immutable"
      : "public, max-age=0, must-revalidate",
  });

  if (request.method === "HEAD") {
    response.end();
    return;
  }

  createReadStream(file).pipe(response);
}).listen(port, () => {
  console.log(`AI Model Index: http://localhost:${port}`);
});
