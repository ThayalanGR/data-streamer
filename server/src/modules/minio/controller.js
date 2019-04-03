import fileModel from './model';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
var storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        await cb(null, 'uploads')
    },
    filename: async function (req, file, cb) {
        req.originalname = file.originalname
        await cb(null, file.originalname)
    }
})
var upload = multer({
    storage: storage
}).single('file');

export const uploadcontroller = async (req, res) => {

    req.on('aborted', () => {
        if (fs.existsSync(path.join('uploads', req.originalname))) {
            fs.unlink(path.join('uploads', req.originalname), function (err) {
                if (err) return console.log(err);
                console.error('req aborted by client', path.join('uploads', req.originalname))
            })
        } else {
            console.error('req aborted by client', path.join('uploads', req.originalname))
        }
    })


    await upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            console.error(err)
            return res.status(500).json(err)
        } else if (err) {
            console.error(err)
            return res.status(500).json(err)
        }
        const file = new fileModel({
            fileName: req.file.originalname,
            type: req.file.mimetype,
            size: req.file.size
        });

        await file.save()
            .then((result) => {
                console.log(result)
                return res.status(200).send({
                    status: true
                });
            }).catch((err) => {
                console.log(err);
                return res.status(500).send({
                    status: false
                });
            });
    })
};



export const downloadcontroller = (req, res) => {


};