import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test endpoint responses', () => {
    it('gets the api endpoint', async () => {
        const parameters = '?filename=fjord';
        const response = await request.get('/api/images/' + parameters);
        expect(response.status).toBe(200);
    }
)});