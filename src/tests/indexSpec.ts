import supertest from 'supertest';
import app from '../index';
import { exists, process } from '../image-processor';
import { unlink } from 'fs/promises';
import path from 'path';

const request = supertest(app);

describe('Test endpoint responses', () => {
    it('gets the api endpoint', async () => {
        const parameters = '?filename=fjord';
        const response = await request.get('/api/images/' + parameters);
        expect(response.status).toBe(200);
    });
});

describe('Test image processing', () => {
    it('processes the image', async () => {
        const filename = 'fjord';
        const width = '640';
        const height = '360';
        const imageInput = path.resolve(`images/full/${filename}.jpg`);
        const imageOutput = path.resolve(
            `images/thumb/${filename}-${width}-${height}.jpg`
        );

        if (await exists(imageOutput)) {
            await unlink(imageOutput);
        }

        await process(imageInput, imageOutput, width, height);

        const imageExists = await exists(imageOutput);

        expect(imageExists).toBeTrue();
    });
});
