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
    uploadedOn: {
        type: Date,
        default: Date.now()
    }
});


export default mongoose.model('files', fileSchema);