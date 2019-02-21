import path from 'path';
import { ZimReader } from '@openzim/libzim';
import express from 'express';

const ZIM_FILE_PATH = path.join(__dirname, '../test.zim');


const reader = new ZimReader(ZIM_FILE_PATH);


const app = express();

app.get('/*', async (req, res) => {
    console.log(req.path);
    try {
        const article = await reader.getArticleByUrl(req.path);
        console.log(`Article has type [${article.mimeType}]`);
        console.log(`Buffer:`, article.bufferData && article.bufferData.length);
        if (!article.bufferData) {
            res.send('404')
        } else {
            res.type(article.mimeType);
            res.send(article.bufferData);
        }
    } catch (err) {
        console.error(`Failed to get article [${req.path}]`, err);
        res.send(err);
    }
});

app.listen(1337, () => {
    console.log('listening on [1337]')
});