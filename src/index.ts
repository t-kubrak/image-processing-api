import express from 'express';
import sharp from 'sharp';
import path from 'path';
import { stat } from 'fs/promises';

const app = express();
const port = 3000;

// start the Express server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});

app.get('/api/images', async (req, res) => {
    const filename = req.query.filename as unknown as string;
    const width = req.query.width as unknown as string;
    const height = req.query.height as unknown as string;
    const imagePath = path.resolve(`images/full/${filename}.jpg`);
    const imageOutput = path.resolve(
        `images/thumb/${filename}-${width}-${height}.jpg`
    );

    if (!width || !height) {
        return res.sendFile(imagePath);
    }

    const imageExists = await stat(imageOutput)
        .then(() => true)
        .catch(() => false);

    if (imageExists) {
        return res.sendFile(imageOutput);
    }

    try {
        await sharp(imagePath)
            .resize(parseInt(width), parseInt(height))
            .toFile(imageOutput);

        return res.sendFile(imageOutput);
    } catch (e) {
        console.error(e);
        res.status(500).send(`Couldn't serve the image specified`);
    }
});

export default app;
