import http from 'http';

export function writeFile(content = '', type = 'text/plain', res) {
  res.writeHead(200, {
      'Content-Length': content.length,
      'Content-Type': type
    });
  res.write(content);
  res.end();
}

export function setupServer(html, js, css) {
  var app = http.createServer((req, res) =>  {
    switch (req.url) {
      case '/js/main.js':
        return writeFile(js, 'text/javascript', res);
      case '/css/styles.css':
        return writeFile(css, 'text/css', res);
      default:
        return writeFile(html, 'text/html', res);
    }
  });

  return app;
}
