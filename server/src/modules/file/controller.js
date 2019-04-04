import fileModel from './model';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';



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

function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var final = '';
    // console.log(s)
    final = s > 0 ? (m > 0 ? (h > 0 ? `${h.toString().length == 1 ? `0${h}`: h}:${m.toString().length == 1 ? `0${m}`: m}:${s.toString().length == 1 ? `0${s}`: s}` : `${m.toString().length == 1 ? `0${m}`: m}:${s.toString().length == 1 ? `0${s}`: s}`) : `${s}`) : `00:00`
    return final;

}

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

        //generating thumbnail
        await ffmpeg(path.join('uploads', req.originalname))
            .screenshots({
                timestamps: ['50%'],
                filename: `thumbnail-${req.originalname.substring(0,req.originalname.toString().length - 5)}.png`,
                folder: 'uploads/thumbnails',
                size: '320x240'
            });
        var duration = 0;

        //calculating video duration
        await ffmpeg.ffprobe(path.join('uploads', req.originalname), async function (err, metadata) {

            if (err) {
                console.error(err);
            }

            console.log(metadata.format.duration);
            var duration = metadata.format.duration;
            const file = new fileModel({
                fileName: req.file.originalname,
                type: req.file.mimetype,
                size: Math.round(req.file.size / (1e+6)),
                thumbnail: `thumbnail-${req.originalname.substring(0,req.originalname.toString().length - 5)}.png`,
                duration: secondsToHms(duration)
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

        });
    })
};


export const downloadcontroller = (req, res) => {
    

};


// export const downloadcontroller = (req, res) => {


// };