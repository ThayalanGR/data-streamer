import fileModel from './model';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';


const fileTypes = {
    "videos": ["webm", "mkv", "flv", "vob", "ogv", "ogg", "drc", "gif", "gifv", "mng", "avi", "MTS", "M2TS", "mov", "qt", "wmv", "yuv", "rm", "rmvb", "asf", "amv", "mp4", "m4v", "mpg", "mp2", "mpeg", "mpe", "mpv", "mpg", "mpeg", "m2v", "m4v", "svi", "3gp", "3g2", "mxf", "roq", "nsv", "flv", "f4v", "f4p", "f4a", "f4b"],
    "audios": ["ape", "wv", "m4a", "wav", "aiff", "3gp", "aa", "aac", "aax", "act", "aiff", "amr", "ape", "au", "awb", "dct", "dss", "dvf", "flac", "gsm", "iklax", "ivs", "m4a", "m4b", "m4p", "mmf", "mp3", "mpc", "msv", "nmf", "nsf", "ogg", "oga", "mogg", "opus", "ra", "rm", "ra", "raw", "sln", "tta", "vox", "wav", "wma", "wv", "webm", "8svx"],
    "images": ["tif", "jpg", "jpeg", "gif", "png", "bmp", "raw", "tiff", "jpeg2000", "webp", "svg", "eps", "pct", "pcx", "tga", "wmf"]
}

let reqFileType = '';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let fileName = file.originalname.split(".");
        if (fileTypes.videos.includes(fileName[fileName.length - 1].toLowerCase())) {
            reqFileType = 'video';
            cb(null, 'uploads/videos');
        } else if (fileTypes.audios.includes(fileName[fileName.length - 1].toLowerCase())) {
            reqFileType = 'audio';
            cb(null, 'uploads/audios');
        } else if (fileTypes.images.includes(fileName[fileName.length - 1].toLowerCase())) {
            reqFileType = 'image';
            cb(null, 'uploads/images');
        } else {
            cb(null, 'uploads/others')
        }
    },
    filename: function (req, file, cb) {
        req.originalname = file.originalname
        cb(null, file.originalname)
    }
})

var upload = multer({
    storage: storage
}).single('file');

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var final = '';
    // console.log(s)
    final = s > 0 ? (m > 0 ? (h > 0 ? `${h.toString().length == 1 ? `0${h}` : h}:${m.toString().length == 1 ? `0${m}` : m}:${s.toString().length == 1 ? `0${s}` : s}` : `${m.toString().length == 1 ? `0${m}` : m}:${s.toString().length == 1 ? `0${s}` : s}`) : `${s}`) : `00:00`
    return final;

}

export const uploadFileController = async (req, res) => {
    req.on('aborted', () => {
        if (reqFileType === 'video') {
            if (fs.existsSync(path.join('uploads/videos', req.originalname))) {
                fs.unlink(path.join('uploads/videos', req.originalname), function (err) {
                    if (err) return console.log(err);
                    console.error('req aborted by client', path.join('uploads', req.originalname))
                })
                reqFileType = '';
            } else {
                console.error('req aborted by client', path.join('uploads', req.originalname))
                reqFileType = '';
            }
        } else if (reqFileType === 'audio') {
            if (fs.existsSync(path.join('uploads/audios', req.originalname))) {
                fs.unlink(path.join('uploads/audios', req.originalname), function (err) {
                    if (err) return console.log(err);
                    console.error('req aborted by client', path.join('uploads', req.originalname))
                })
                reqFileType = '';

            } else {
                console.error('req aborted by client', path.join('uploads', req.originalname))
                reqFileType = '';
            }
        } else if (reqFileType === 'image') {
            if (fs.existsSync(path.join('uploads/images', req.originalname))) {
                fs.unlink(path.join('uploads/images', req.originalname), function (err) {
                    if (err) return console.log(err);
                    console.error('req aborted by client', path.join('uploads', req.originalname))
                })
                reqFileType = '';

            } else {
                console.error('req aborted by client', path.join('uploads', req.originalname))
                reqFileType = '';
            }
        } else {
            if (fs.existsSync(path.join('uploads/others', req.originalname))) {
                fs.unlink(path.join('uploads/others', req.originalname), function (err) {
                    if (err) return console.log(err);
                    console.error('req aborted by client', path.join('uploads', req.originalname))
                })
                reqFileType = '';

            } else {
                console.error('req aborted by client', path.join('uploads', req.originalname))
                reqFileType = '';

            }
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

        if (reqFileType === 'video') {
            //generating thumbnail
            await ffmpeg(path.join('uploads/videos', req.originalname))
                .screenshots({
                    timestamps: ['50%'],
                    filename: `thumbnail-${req.originalname.substring(0, req.originalname.toString().length - 5)}.png`,
                    folder: 'uploads/videos/thumbnails',
                    size: '320x240'
                });
            //calculating video duration
            await ffmpeg.ffprobe(path.join('uploads/videos', req.originalname), async function (err, metadata) {

                if (err) {
                    console.error(err);
                }

                // console.log(metadata.format.duration);
                const duration = metadata.format.duration;
                const thumbnail = `thumbnail-${req.originalname.substring(0, req.originalname.toString().length - 5)}.png`;
                const path = `uploads/videos/${req.originalname}`
                await updateDatabase(req, res, thumbnail, duration, path);
            });
        } else if (reqFileType === 'audio') {
            //calculating video duration
            await ffmpeg.ffprobe(path.join('uploads/audios', req.originalname), async function (err, metadata) {
                if (err) {
                    console.error(err);
                }
                // console.log(metadata.format.duration);
                const duration = metadata.format.duration;
                const thumbnail = `none`;
                const path = `uploads/audios/${req.originalname}`
                await updateDatabase(req, res, thumbnail, duration, path);
            })
        } else if (reqFileType === 'image') {
            let thumbnail = "none";
            let duration = "none";
            const path = `uploads/images/${req.originalname}`
            await updateDatabase(req, res, thumbnail, duration, path);
        } else {
            let thumbnail = "none";
            let duration = "none";
            const path = `uploads/others/${req.originalname}`
            await updateDatabase(req, res, thumbnail, duration, path);
        }

    })
};

async function updateDatabase(req, res, thumbnail, duration, path) {
    const file = new fileModel({
        fileName: req.file.originalname,
        type: req.file.mimetype,
        size: Math.round(req.file.size / (1e+6)) > 0 ? Math.round(req.file.size / (1e+6)).toString() + " mb" : req.file.size / 1000 > 0 ? Math.round(req.file.size / 1000).toString() + " kb" : Math.round(req.file.size).toString() + " b",
        path: path,
        class: reqFileType.length > 0 ? reqFileType : 'others',
        thumbnail: thumbnail,
        duration: secondsToHms(duration)
    });

    await file.save()
        .then((result) => {
            // console.log(result)
            return res.status(200).send({
                status: true
            });
        }).catch((err) => {
            console.log(err);
            return res.status(500).send({
                status: false
            });
        });
    reqFileType = "";


}

export const fetchAllFilesController = (req, res) => {

    fileModel.find({}, (err, items) => {
        if (err) {
            res.status(404);
        }
        else {
            res.status(200).send({ items })
        }

    })


}

export const downloadFileController = (req, res) => {


    fileModel.find({ _id: req.params.id }, (err, items) => {
        if (err) {
            res.status(404);
        }
        else {
            var file = items[0].path;
            if (fs.existsSync(file)) {
                res.setHeader('Content-disposition', 'attachment; filename=' + items[0].fileName);
                res.setHeader('Content-type', items[0].type);
                res.setHeader('Content-length', fs.statSync(file)['size']);
                var filestream = fs.createReadStream(file);
                filestream.pipe(res);
                res.send({ status: true })
            } else {
                res.send({ status: false })
            }
        }
    })
}

export const deleteFileController = (req, res) => {
    console.log(req.params.id)
    fileModel.find({ _id: req.params.id }, (err, items) => {
        if (err) {
            res.status(404).send({ status: "something went wrong" });
        }
        else {
            console.log(items)
            var file = items[0].path;
            if (fs.existsSync(file)) {
                fs.unlink(file, (err) => {
                    if (err) console.log(err);
                })
                if (items[0].thumbnail !== 'none') {
                    fs.unlink(`uploads/videos/thumbnails/${items[0].thumbnail}`, (err) => {
                        console.log(err);
                    });
                }
                fileModel.deleteOne({ _id: req.params.id }, (err) => {
                    if (!err) {
                        res.status(200).send({ status: "file removed successfully" })
                    }
                })
            } else {
                fileModel.deleteOne({ _id: req.params.id }, (err) => {
                    if (!err) {
                        res.status(200).send({ status: "file removed successfully" })
                    }
                })
            }
        }
    })
}

export const deleteAllFilesController = (req, res) => {

    const directories = ['uploads/audios', 'uploads/images', 'uploads/videos', 'uploads/others', 'uploads/videos/thumbnails']

    directories.map((item) => {
        fs.readdir(item, (err, files) => {
            if (err) console.log(err);

            for (const file of files) {
                if (file === 'thumbnails') continue;
                if (fs.existsSync(path.join(item, file))) {
                    fs.unlink(path.join(item, file), err => {
                        if (err) console.log(err);
                    });
                }
            }
        });
    })

    fileModel.deleteMany({}, (err) => {
        if (err) res.send({ status: false })
        else res.send({ status: true })
    })

}