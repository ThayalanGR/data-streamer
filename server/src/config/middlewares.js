import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import http from 'http';
import socketIO from 'socket.io';

export default (app) => {
    const server = http.createServer(app);
    const io = socketIO(server);
    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(cors());
    app.use(session({
        secret: 'datastreamer',
        cookie: {
            maxAge: 60000
        },
        resave: false,
        saveUninitialized: false
    }));
    app.set('socketio', io);
};