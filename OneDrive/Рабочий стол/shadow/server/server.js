const http = require('http');
const fs = require('fs');
const path = require('path');

const htmlDir = path.join(__dirname, '../html');
const styleDir = path.join(__dirname, '../style');
const jsDir = path.join(__dirname, '../js');
const photoDir = path.join(__dirname, '../photo');
const musicDir = path.join(__dirname, '../music');

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif', 
    '.webp' : 'image/webp', 
    '.mp3' : 'audio/mpeg',
};


http.createServer((req, res) => {
    let filePath;

    try {
        const decodedUrl = decodeURIComponent(req.url);

        if (decodedUrl === '/') {
            filePath = path.join(htmlDir, 'index.html')
        } else if (decodedUrl.startsWith('/style/')) {
            filePath = path.join(styleDir, decodedUrl.slice(7))
        } else if (decodedUrl.startsWith('/js/')) {
            filePath = path.join(jsDir, decodedUrl.slice(4))
        } else if (decodedUrl.startsWith('/photo/')) {
            filePath = path.join(photoDir, decodedUrl.slice(7))
        } else if (decodedUrl.startsWith('/music/')) {
            filePath = path.join(musicDir, decodedUrl.slice(7))
        } else {
            filePath = path.join(htmlDir, decodedUrl.replace(/^\/+/, ''))
        }

        const extname = path.extname(filePath);
        const contentType = mimeTypes[extname] || 'application/octet-stream'
        console.log( filePath)

        if (extname === '.mp3') {
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Internal Server Error');
                    return;
                }

                const range = req.headers.range;
                if (!range) {
                    res.writeHead(416);
                    res.end();
                    return;
                }

                const [startStr, endStr] = range.replace(/bytes=/, '').split('-');
                const start = parseInt(startStr, 10);
                const end = endStr ? parseInt(endStr, 10) : stats.size - 1;

                if (start >= stats.size) {
                    res.writeHead(416);
                    res.end();
                    return;
                }

                const chunkSize = end - start + 1;
                const head = {
                    'Content-Range': `bytes ${start}-${end}/${stats.size}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunkSize,
                    'Content-Type': 'audio/mpeg',
                };
                res.writeHead(206, head);

                fs.createReadStream(filePath, { start, end }).pipe(res);
            });

        } else {
            fs.readFile(filePath, (err, content) => {
                if (err) {
                    if (err.code === 'ENOENT') {
                        fs.readFile(path.join(htmlDir, '404Found.html'), (err404, content404) => {
                            if (err404) {
                                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                                res.end('<h1>500 Internal Server Error</h1>');
                            } else {
                                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                                res.end(content404);
                            }
                        });
                    } else {
                        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                        res.end('<h1>500 Internal Server Error</h1>');
                    }
                } else {
                    if (extname === '.html') {
                        let htmlCont = content.toString();
                        const scriptTag = '<script src="/js/main.js" defer></script>';

                        if (htmlCont.includes('</head>')) {
                            htmlCont = htmlCont.replace('</head>', `${scriptTag}</head>`);
                        } else {
                            console.warn('tag </head> not found in', filePath);
                            htmlCont = htmlCont.replace('<head>', `<head>\n${scriptTag}`);
                        }

                        res.writeHead(200, { 'Content-Type': contentType });
                        res.end(htmlCont);
                        return;
                    }

                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(content);
                }
            });
        }

    } catch (e) {
        console.error('URL decoding error:', e.message);
        res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>400 Bad Request</h1>');
    }
}).listen(4412, () => {
    console.log('Server running at http://localhost:4412');
});