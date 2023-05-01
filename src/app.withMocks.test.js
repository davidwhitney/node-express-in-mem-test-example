import { ExpressAndJestWebApplicationFactory } from './WebApplicationFactory';
import { jest } from '@jest/globals';

// This is unstable because Jest are still working on the
// ESM Mocking API, but if you're not using ESM, regular
// jest.mock calls would work just fine here

jest.unstable_mockModule('./WeatherService', () => {
    return {
        getWeather: function () {
            return {
                temp: 50,
                conditions: 'Sunny'
            };
        }
    }
});

describe('Application (with ExpressAndJestWebApplicationFactory and Mocking)', () => {

    let factory;
    beforeAll(async () => {
        const app = (await import('./api.js')).default; // <-- Jest ESM Mocking import
        factory = new ExpressAndJestWebApplicationFactory(app);
        await factory.start();
    });

    afterAll(async () => {
        await factory.stop();
    });

    test('returns temperature from the weather service', async () => {
        const response = await fetch(`${factory.baseUrl}/weather`);
        const json = await response.json();

        expect(json.temp).toBe(50); // from weather mock
    });
});

