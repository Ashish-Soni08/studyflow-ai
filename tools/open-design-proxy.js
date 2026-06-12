const http = require("node:http");

const targetPort = Number(process.env.OD_TARGET_PORT || 49540);
const listenPort = Number(process.env.OD_PROXY_PORT || 7456);

const server = http.createServer((request, response) => {
  const proxy = http.request(
    {
      hostname: "127.0.0.1",
      port: targetPort,
      path: request.url,
      method: request.method,
      headers: request.headers,
    },
    (upstream) => {
      response.writeHead(upstream.statusCode || 502, upstream.headers);
      upstream.pipe(response);
    }
  );

  proxy.on("error", (error) => {
    response.writeHead(502, { "content-type": "application/json" });
    response.end(JSON.stringify({ error: error.message }));
  });

  request.pipe(proxy);
});

server.listen(listenPort, "127.0.0.1");
