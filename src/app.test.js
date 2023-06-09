import app from './api.js';
import { ExpressAndJestWebApplicationFactory } from './WebApplicationFactory';

describe('Application (with ExpressAndJestWebApplicationFactory)', () => {

    let factory;
    beforeAll(async () => {
        factory = new ExpressAndJestWebApplicationFactory(app);
        await factory.start();
    });

    afterAll(async () => {
        await factory.stop();
    });

    test('returns temperature from the weather service', async () => {
        const response = await fetch(`${factory.baseUrl}/weather`);
        const json = await response.json();

        expect(json.temp).toBe(70);
    });
});

