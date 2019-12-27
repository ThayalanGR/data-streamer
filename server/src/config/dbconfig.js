/* eslint-disable no-console */
import mongoose from 'mongoose';

// const Uri = 'mongodb://<username>:<password>@ds247944.mlab.com:47944/apctmd';
const Uri = 'mongodb://localhost/datastreamer';
export default () => {
    mongoose.connect(Uri, {useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.connection.on('connected', () => console.log('mongodb connected'));
    mongoose.connection.on('error', (err) => console.log(err));
};