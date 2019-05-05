import {
    Router
} from 'express';
import * as fileController from './controller';
import authorizer from '../../config/authorize';

const routes = new Router();

routes.post('/upload', authorizer.optional,  fileController.uploadFileController);
routes.get('/fetchallfiles', authorizer.optional, fileController.fetchAllFilesController);
routes.get('/downloadfile/:id', authorizer.optional, fileController.downloadFileController);
routes.get('/deletefile/:id', authorizer.optional, fileController.deleteFileController);
routes.get('/deleteallfiles', authorizer.optional, fileController.deleteAllFilesController);


export default routes;