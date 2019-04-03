import {
    Router
} from 'express';
import * as fileController from './controller';
import authorizer from '../../config/authorize';

const routes = new Router();

routes.post('/upload', authorizer.optional,  fileController.uploadcontroller);
routes.post('/download', authorizer.optional, fileController.downloadcontroller);


export default routes;