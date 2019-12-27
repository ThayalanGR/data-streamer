import mongoose, {
    Schema
} from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const fileSchema = Schema({
    fileName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    subtitlePath: {
        type: String,
        required: false
    },
    class: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: false
    },
    duration: {
        type: String,
        required: false
    },
    uploadedOn: {
        type: Date,
        default: Date.now()
    }, 
});


export default mongoose.model('files', fileSchema);