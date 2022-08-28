import express, { Request, Response } from 'express';
import { process, exists } from './image-processor';
import path from 'path';
import { mkdir } from 'fs/promises';

const app = express();
const port = 3000;

// start the Express server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});

app.get(
    '/api/images',
    async (req: Request, res: Response): Promise<Response | void> => {
        const filename = req.query.filename as unknown as string;
        const width = req.query.width as unknown as string;
        const height = req.query.height as unknown as string;
        const imageInput = path.resolve(`images/full/${filename}.jpg`);
        const imageOutput = path.resolve(
            `images/thumb/${filename}-${width}-${height}.jpg`
        );
        const thumbFolder = path.resolve('images/thumb');

        if (!width || !height) {
            return res.sendFile(imageInput);
        }

        if (!(await exists(thumbFolder))) {
            await mkdir(thumbFolder);
        }

        if (await exists(imageOutput)) {
            return res.sendFile(imageOutput);
        }

        try {
            await process(imageInput, imageOutput, width, height);

            return res.sendFile(imageOutput);
        } catch (e) {
            console.error(e);
            res.status(500).send(`Couldn't serve the image specified`);
        }
    }
);

export default app;
