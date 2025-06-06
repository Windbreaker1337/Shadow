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
    '.gif': 'image/gif'
};

http.createServer((req, res) => {
    let filePath;

    if (req.url === '/') {
        filePath = path.join(htmlDir, 'index.html');

    } else if (req.url.startsWith('/style/')) {
        filePath = path.join(styleDir, req.url.slice(7));

    }else if (req.url.startsWith('/js/')) {
        filePath = path.join(jsDir, req.url.slice(4));

    }else if(req.url.startsWith('/photo/')){ 
        filePath = path.join(photoDir, req.url.slice(7));

    } else {
        filePath = path.join(htmlDir, req.url.replace(/^\/+/, ''));
    }

    const extname = path.extname(filePath);
    const contentType = mimeTypes[extname] || 'text/plain';

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
                if(extname === '.html'){ 
                    let htmlCont = content.toString(); 
                    const scritTag = '<script src="/js/main.js" defer></script>';
                    if( html.includes('</head>')){ 
                        htmlCont = htmlCont.replace('</head>' , `${scritTag}</head>`)
                    }else{ 
                        console.warn('тег худ не найден  в' , filePath);
                        htmlCont = htmlCont.replace('</head>' , `<head>\n${scritTag}`)
                    }
                }
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<h1>500 Internal Server Error</h1>');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
}).listen(4412, () => {
    console.log('Server runing  http://localhost:4412');
});
