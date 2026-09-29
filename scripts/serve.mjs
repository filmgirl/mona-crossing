import { createServer } from "node:http";
import { readFile, realpath, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".svg": "image/svg+xml", ".png": "image/png", ".ttf": "font/ttf", ".txt": "text/plain" };
export function createPreviewServer() {
  return createServer(async (request, response) => {
    if (!["GET", "HEAD"].includes(request.method)) {
      response.writeHead(405, { Allow: "GET, HEAD" }).end("Method not allowed");
      return;
    }
    try {
      let pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
      if (pathname.startsWith("/mona-crossing/")) pathname = pathname.slice(14);
      if (pathname === "/" || pathname === "") pathname = "/index.html";
      if (!/^\/(?:index\.html|styles\.css|src\/[a-z-]+\.js|assets\/[a-zA-Z0-9/._-]+)$/.test(pathname)) {
        response.writeHead(404).end("Not found");
        return;
      }
      const file = await realpath(path.join(root, pathname));
      if (!file.startsWith(root) || !(await stat(file)).isFile()) {
        response.writeHead(404).end("Not found");
        return;
      }
      const body = await readFile(file);
      response.writeHead(200, { "Content-Type": `${types[path.extname(file)] || "application/octet-stream"}`,
        "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" });
      response.end(request.method === "HEAD" ? undefined : body);
    } catch (error) {
      if (error.code === "ENOENT" || error.code === "ENOTDIR") response.writeHead(404).end("Not found");
      else if (error instanceof URIError) response.writeHead(400).end("Bad request");
      else {
        console.error("Preview request failed:", error);
        response.writeHead(500).end("Preview server error");
      }
    }
  });
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const server = createPreviewServer();
  server.listen(Number(process.env.PORT || 4177), process.env.HOST || "127.0.0.1", () => {
    console.log(`Mona Crossing: http://${process.env.HOST || "127.0.0.1"}:${server.address().port}/mona-crossing/`);
  });
}
