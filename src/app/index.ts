import express from 'express';

import cors from 'cors';

import env from './env';
import routes from './router';

class ServiceApp {

    public service: express.Express;

    constructor() {
        this.service = express();
        
        this.service.use(express.json())
        this.service.use(cors())
        this.service.use('/', routes)
    }

    public startService(): void {
        this.service.listen(env.portServer, () => console.log("Serviço rodando na porta %s!", env.portServer))
    }
}

export default new ServiceApp();