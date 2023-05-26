import express from 'express';
import request from 'request';
import cors from 'cors';

const app = express();
const port = process.env.port || 3000;

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'ALLOW-FROM *');
    next();
});

app.use((req, res) => {
    const url = `https://brainly.co.id${req.url}`;

    const proxyRequest = request(url);

    proxyRequest.on('response', (proxyResponse) => {
        if (proxyResponse.headers['set-cookie']) {
            delete proxyResponse.headers['set-cookie'];
        }
    });

    req.pipe(proxyRequest).pipe(res);
});


app.listen(port, () => {
    console.log(
        `🚀 Server started on port ${port}\n🌐 http://localhost:${port}/`
    );
});
