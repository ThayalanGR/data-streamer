import {
    Router
} from 'express';
import * as fileController from './controller';
import authorizer from '../../config/authorize';

const routes = new Router();

routes.post('/upload/:id', authorizer.optional,  fileController.uploadFileController);
routes.get('/fetchallfiles', authorizer.optional, fileController.fetchAllFilesController);
routes.get('/downloadfile/:id', authorizer.optional, fileController.downloadFileController);
routes.get('/deletefile/:id', authorizer.optional, fileController.deleteFileController);
routes.get('/deletesubtitle/:id', authorizer.optional, fileController.deleteSubtitleController);
routes.get('/deleteallfiles', authorizer.optional, fileController.deleteAllFilesController);
routes.get('/fetchallvideos', authorizer.optional, fileController.fetchAllVideosController);
routes.get('/servestaticcontent/:path', authorizer.optional, fileController.serveStaticContentController);
routes.get('/streamcontent/:path', authorizer.optional, fileController.streamContentController);


export default routes;