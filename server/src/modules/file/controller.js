import fileModel from "./model";
import multer from "multer";
import path from "path";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";
import mime from "mime-types";
import srt2vtt from "srt-to-vtt";

const fileTypes = {
  videos: [
    "webm",
    "mkv",
    "flv",
    "vob",
    "ogv",
    "ogg",
    "drc",
    "gif",
    "gifv",
    "mng",
    "avi",
    "MTS",
    "M2TS",
    "mov",
    "qt",
    "wmv",
    "yuv",
    "rm",
    "rmvb",
    "asf",
    "amv",
    "mp4",
    "m4v",
    "mpg",
    "mp2",
    "mpeg",
    "mpe",
    "mpv",
    "mpg",
    "mpeg",
    "m2v",
    "m4v",
    "svi",
    "3gp",
    "3g2",
    "mxf",
    "roq",
    "nsv",
    "flv",
    "f4v",
    "f4p",
    "f4a",
    "f4b",
  ],
  audios: [
    "ape",
    "wv",
    "m4a",
    "wav",
    "aiff",
    "3gp",
    "aa",
    "aac",
    "aax",
    "act",
    "aiff",
    "amr",
    "ape",
    "au",
    "awb",
    "dct",
    "dss",
    "dvf",
    "flac",
    "gsm",
    "iklax",
    "ivs",
    "m4a",
    "m4b",
    "m4p",
    "mmf",
    "mp3",
    "mpc",
    "msv",
    "nmf",
    "nsf",
    "ogg",
    "oga",
    "mogg",
    "opus",
    "ra",
    "rm",
    "ra",
    "raw",
    "sln",
    "tta",
    "vox",
    "wav",
    "wma",
    "wv",
    "webm",
    "8svx",
  ],
  images: [
    "tif",
    "jpg",
    "jpeg",
    "gif",
    "png",
    "bmp",
    "raw",
    "tiff",
    "jpeg2000",
    "webp",
    "svg",
    "eps",
    "pct",
    "pcx",
    "tga",
    "wmf",
  ],
  subtitles: ["srt", "vtt"],
};

let reqFileType = "";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let fileName = file.originalname.split(".");
    if (
      fileTypes.videos.includes(fileName[fileName.length - 1].toLowerCase())
    ) {
      reqFileType = "video";
      const path = "uploads/videos";
      fs.mkdirSync(path, { recursive: true });
      cb(null, path);
    } else if (
      fileTypes.audios.includes(fileName[fileName.length - 1].toLowerCase())
    ) {
      reqFileType = "audio";
      const path = "uploads/audios";
      fs.mkdirSync(path, { recursive: true });
      cb(null, path);
    } else if (
      fileTypes.images.includes(fileName[fileName.length - 1].toLowerCase())
    ) {
      reqFileType = "image";
      const path = "uploads/images";
      fs.mkdirSync(path, { recursive: true });
      cb(null, path);
    } else if (
      fileTypes.subtitles.includes(fileName[fileName.length - 1].toLowerCase())
    ) {
      reqFileType = "subtitle";
      if (fileName[fileName.length - 1].toLowerCase() === "srt") {
        const path = "uploads/videos/subtitles/srt";
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
      } else {
        const path = "uploads/videos/subtitles/vtt";
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
      }
    } else {
      const path = "uploads/others";
      fs.mkdirSync(path, { recursive: true });
      cb(null, path);
    }
  },
  filename: function (req, file, cb) {
    req.originalname = file.originalname;
    cb(null, file.originalname);
  },
});

var upload = multer({
  storage: storage,
}).single("file");

function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var final = "";
  // console.log(s)
  final =
    s > 0
      ? m > 0
        ? h > 0
          ? `${h.toString().length == 1 ? `0${h}` : h}:${
              m.toString().length == 1 ? `0${m}` : m
            }:${s.toString().length == 1 ? `0${s}` : s}`
          : `${m.toString().length == 1 ? `0${m}` : m}:${
              s.toString().length == 1 ? `0${s}` : s
            }`
        : `${s}`
      : `00:00`;
  return final;
}

export const uploadFileController = async (req, res) => {
  req.on("aborted", () => {
    if (reqFileType === "video") {
      if (fs.existsSync(path.join("uploads/videos", req.originalname))) {
        fs.unlink(
          path.join("uploads/videos", req.originalname),
          function (err) {
            if (err) return console.log(err);
            console.error(
              "req aborted by client",
              path.join("uploads", req.originalname)
            );
          }
        );
        reqFileType = "";
      } else {
        console.error(
          "req aborted by client",
          path.join("uploads", req.originalname)
        );
        reqFileType = "";
      }
    } else if (reqFileType === "audio") {
      if (fs.existsSync(path.join("uploads/audios", req.originalname))) {
        fs.unlink(
          path.join("uploads/audios", req.originalname),
          function (err) {
            if (err) return console.log(err);
            console.error(
              "req aborted by client",
              path.join("uploads", req.originalname)
            );
          }
        );
        reqFileType = "";
      } else {
        console.error(
          "req aborted by client",
          path.join("uploads", req.originalname)
        );
        reqFileType = "";
      }
    } else if (reqFileType === "image") {
      if (fs.existsSync(path.join("uploads/images", req.originalname))) {
        fs.unlink(
          path.join("uploads/images", req.originalname),
          function (err) {
            if (err) return console.log(err);
            console.error(
              "req aborted by client",
              path.join("uploads", req.originalname)
            );
          }
        );
        reqFileType = "";
      } else {
        console.error(
          "req aborted by client",
          path.join("uploads", req.originalname)
        );
        reqFileType = "";
      }
    } else {
      if (fs.existsSync(path.join("uploads/others", req.originalname))) {
        fs.unlink(
          path.join("uploads/others", req.originalname),
          function (err) {
            if (err) return console.log(err);
            console.error(
              "req aborted by client",
              path.join("uploads", req.originalname)
            );
          }
        );
        reqFileType = "";
      } else {
        console.error(
          "req aborted by client",
          path.join("uploads", req.originalname)
        );
        reqFileType = "";
      }
    }
  });

  await upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      console.error(err);
      return res.status(500).json(err);
    } else if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    if (reqFileType === "video") {
      //generating thumbnail
      await ffmpeg(path.join("uploads/videos", req.originalname)).screenshots({
        timestamps: ["50%"],
        filename: `thumbnail-${req.originalname.substring(
          0,
          req.originalname.toString().length - 5
        )}.png`,
        folder: "uploads/videos/thumbnails",
        size: "320x240",
      });
      //calculating video duration
      await ffmpeg.ffprobe(
        path.join("uploads/videos", req.originalname),
        async function (err, metadata) {
          if (err) {
            console.error(err);
          }

          // console.log(metadata.format.duration);
          const duration = metadata.format.duration;
          const thumbnail = `uploads/videos/thumbnails/thumbnail-${req.originalname.substring(
            0,
            req.originalname.toString().length - 5
          )}.png`;
          const path = `uploads/videos/${req.originalname}`;
          await updateDatabase(req, res, thumbnail, duration, path);
        }
      );
    } else if (reqFileType === "audio") {
      //calculating video duration
      await ffmpeg.ffprobe(
        path.join("uploads/audios", req.originalname),
        async function (err, metadata) {
          if (err) {
            console.error(err);
          }
          // console.log(metadata.format.duration);
          const duration = metadata.format.duration;
          const thumbnail = `none`;
          const path = `uploads/audios/${req.originalname}`;
          await updateDatabase(req, res, thumbnail, duration, path);
        }
      );
    } else if (reqFileType === "image") {
      let thumbnail = "none";
      let duration = "none";
      const path = `uploads/images/${req.originalname}`;
      await updateDatabase(req, res, thumbnail, duration, path);
    } else if (reqFileType === "subtitle") {
      // update the mongodb with the id of video file
      // converting srt to vtt
      const fileName = req.originalname.split(".");
      const isSrt =
        fileName[fileName.length - 1].toLowerCase() === "srt" ? true : false;
      let vttName = req.originalname;
      if (isSrt) {
        vttName = `${fileName.join()}.vtt`;
        fs.createReadStream(`uploads/videos/subtitles/srt/${req.originalname}`)
          .pipe(srt2vtt())
          .pipe(
            fs.createWriteStream(`uploads/videos/subtitles/vtt/${vttName}`)
          );
      }
      const subtitlePath = `uploads/videos/subtitles/vtt/${vttName}`;
      const id = req.params.id;
      await updateDbWithSubtitlePath(req, res, id, subtitlePath);
    } else {
      let thumbnail = "none";
      let duration = "none";
      const path = `uploads/others/${req.originalname}`;
      await updateDatabase(req, res, thumbnail, duration, path);
    }
  });
};

async function updateDbWithSubtitlePath(req, res, id, subtitlePath) {
  fileModel.findById(id, function (err, doc) {
    if (err) res.send(err);

    doc.subtitlePath = subtitlePath;

    doc.save((err) => {
      if (err) res.send(err);

      res.status(200).send({
        status: true,
        type: reqFileType,
        id: null,
      });
      reqFileType = "";
    });
  });
}

async function updateDatabase(req, res, thumbnail, duration, path) {
  const file = new fileModel({
    fileName: req.file.originalname,
    type: req.file.mimetype,
    size:
      Math.round(req.file.size / 1e6) > 0
        ? Math.round(req.file.size / 1e6).toString() + " mb"
        : req.file.size / 1000 > 0
        ? Math.round(req.file.size / 1000).toString() + " kb"
        : Math.round(req.file.size).toString() + " b",
    path: path,
    subtitlePath: null,
    class: reqFileType.length > 0 ? reqFileType : "others",
    thumbnail: thumbnail,
    duration: secondsToHms(duration),
  });

  await file
    .save()
    .then((result) => {
      return res.status(200).send({
        status: true,
        type: reqFileType,
        id: result._id,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({
        status: false,
      });
    });
  reqFileType = "";
}

export const fetchAllFilesController = (req, res) => {
  fileModel.find({}, (err, items) => {
    if (err) {
      res.status(404);
    } else {
      res.status(200).send({ items });
    }
  });
};

export const downloadFileController = (req, res) => {
  fileModel.find({ _id: req.params.id }, (err, items) => {
    if (err) {
      res.status(404);
    } else {
      var file = items[0].path;
      if (fs.existsSync(file)) {
        res.setHeader(
          "Content-disposition",
          "attachment; filename=" + items[0].fileName
        );
        res.setHeader("Content-type", items[0].type);
        res.setHeader("Content-length", fs.statSync(file)["size"]);
        var filestream = fs.createReadStream(file);
        filestream.pipe(res);
      } else {
        res.send({ status: false });
      }
    }
  });
};

export const deleteFileController = (req, res) => {
  console.log(req.params.id);
  fileModel.find({ _id: req.params.id }, (err, items) => {
    if (err) {
      res.status(404).send({ status: "something went wrong" });
    } else {
      console.log(items);
      var file = items[0].path;
      if (fs.existsSync(file)) {
        fs.unlink(file, (err) => {
          if (err) console.log(err);
        });
        if (items[0].thumbnail !== "none") {
          fs.unlink(
            `uploads/videos/thumbnails/${items[0].thumbnail}`,
            (err) => {
              console.log(err);
            }
          );
        }
        fileModel.deleteOne({ _id: req.params.id }, (err) => {
          if (!err) {
            res.status(200).send({ status: "file removed successfully" });
          }
        });
      } else {
        fileModel.deleteOne({ _id: req.params.id }, (err) => {
          if (!err) {
            res.status(200).send({ status: "file removed successfully" });
          }
        });
      }
    }
  });
};
export const deleteSubtitleController = (req, res) => {
  console.log(req.params.id);
  fileModel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { subtitlePath: null } },
    { new: false },
    (err, items) => {
      if (err) {
        res.status(404).send({ status: "something went wrong" });
      } else {
        console.log(items);
        var file = items.subtitlePath;
        if (fs.existsSync(file)) {
          fs.unlink(file, (err) => {
            if (err) console.log(err);
            else
              res.status(200).send({ status: "subtitle removed successfully" });
          });
        } else {
          res.status(200).send({ status: "subtitle removed successfully" });
        }
      }
    }
  );
};

export const deleteAllFilesController = async (req, res) => {
  const directories = [
    "uploads/audios",
    "uploads/images",
    "uploads/videos",
    "uploads/others",
    "uploads/videos/thumbnails",
    "uploads/videos/subtitles/vtt",
    "uploads/videos/subtitles/vtt",
  ];

  directories.map((item) => {
    fs.readdir(item, async (err, files) => {
      if (err) console.log(err);

      for (const file of files) {
        if (file === "thumbnails") continue;
        if (file === "subtitles") continue;
        if (file === "srt") continue;
        if (file === "vtt") continue;
        if (fs.existsSync(path.join(item, file))) {
          await fs.unlink(path.join(item, file), (err) => {
            if (err) console.log(err);
          });
        }
      }
    });
  });

  await fileModel.deleteMany({}, (err) => {
    if (err) res.send({ status: false });
    else res.send({ status: true });
  });
};

export const fetchAllVideosController = async (req, res) => {
  await fileModel.find({ class: "video" }, async (err, items) => {
    if (err) console.log(err);
    else {
      await res.status(200).send(items);
    }
  });
};

export const serveStaticContentController = async (req, res) => {
  const file = Buffer.from(req.params.path, "base64").toString();
  if (fs.existsSync(file)) {
    var type = mime.lookup(file);
    console.log(type);

    var stream = fs.createReadStream(file);
    res.set("Content-Type", type);
    stream.pipe(res);
  } else {
    res.status(404).send({ status: "requested file not found!" });
  }
};

export const streamContentController = (req, res) => {
  const path = Buffer.from(req.params.path, "base64").toString();

  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const mimeType = mime.lookup(path);
  console.log(mimeType);

  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = end - start + 1;
    const file = fs.createReadStream(path, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": mimeType,
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": mimeType,
    };
    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  }
};
