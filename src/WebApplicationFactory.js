export class ExpressAndJestWebApplicationFactory {
    constructor(app) {
        this.app = app;
        this.port = 0;
    }

    get baseUrl() {
        return `http://localhost:${this.port}`;
    }

    async start() {
        await new Promise((resolve, reject) => {
            this.server = this.app.listen(0, () => {
                resolve();
            });
        });

        this.port = this.server.address().port;
    }

    async stop() {
        return new Promise((resolve, reject) => {
            this.server.close(() => {
                resolve();
            });
        });
    }
}