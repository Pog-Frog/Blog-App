import 'reflect-metadata';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { connect, set } from 'mongoose';
import { PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from './config';
import { dbConnection } from './database';
import { Routes } from './interfaces/routes.interface';
import ErrorMiddleware from "./middlewares/error.middleware";
import http from 'http';
import {Server} from "socket.io";
import {initSocketRoutes} from "./routes/socket.route";

export class App{
    public app: express.Application;
    public port: string | number;
    public socket_port: string | number;
    public socket_server: any;
    public io: any;

    constructor(routes: Routes[]){
        this.app = express();
        this.port = PORT;
        this.socket_port = parseInt(PORT.toString()) + 1;
        this.socket_server = http.createServer(this.app);
        this.io = new Server(this.socket_server);

        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
        initSocketRoutes(this.io);
    }

    public listen(){
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
        this.socket_server.listen(this.socket_port, () => {
            console.log(`Socket listening on port ${this.socket_port}`);
        });
    }

    public getServer(){
        return this.app;
    }

    private async connectToDatabase(){
        // @ts-ignore
        await connect(dbConnection.url, dbConnection.options).then(() => {
            console.log('Connected to database');
        });
    }

    private initializeMiddlewares(){
        this.app.use(morgan(LOG_FORMAT));
        this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
        this.app.use(hpp());
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
    }

    private initializeRoutes(routes: Routes[]){
        routes.forEach(route => {
            this.app.use('/', route.router);
        });
    }

    private initializeErrorHandling(){
        this.app.use(ErrorMiddleware);
    }
}