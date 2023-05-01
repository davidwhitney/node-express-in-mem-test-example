import app from './api.js';

// Example: Just using raw server to listen

describe('Application (with raw Express)', () => {
    let server;
    beforeAll(async () => {
        server = app.listen(3000);
    });

    afterAll(async () => {
        await new Promise(resolve => {
            server.close(resolve);
        });
    });

    test('returns temperature from the weather service', async () => {
        const response = await fetch("http://localhost:3000/weather");
        const json = await response.json();

        expect(json.temp).toBe(70);
    });
});
