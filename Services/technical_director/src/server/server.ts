import express = require('express');
import path = require('path');
import director_tecnico from '../routes/director-tecnico.routes';

export default class Server {
    public app: express.Application;
    public port: number;

    constructor(port: number) {
        this.app = express();
        this.port = port;

        this.middlewares();
        this.routes();
    }

    middlewares() {
        /**
         * HEADEARS & CORS
         */
        this.app.use((req: any, res: any, next: any) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
            if (req.methods == "OPTIONS") {
                res.sendStatus(200);
            } else {
                next();
            }
        });

        // LECTURA DEL BODY
        this.app.use(express.json({ limit: '100mb' }));
        this.app.use(express.urlencoded({ extended: true }));

        // CARPETA PUBLICA
        this.publicFolder();
    }

    /**
     * CARPETA PUBLICA
     */
    private publicFolder() {
        const publicPath = path.resolve(__dirname, '../public');
        this.app.use(express.static(publicPath));
    }

    /**
     * RUTAS
     */
    routes() {
        const api: string = "/"
        this.app.use(api, director_tecnico);
    }

    /**
     * LISTEN PORT
     */
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        });
    }

}