// /middlewares/upload.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// 업로드 폴더가 없으면 생성
const uploadPath = path.join(__dirname, "../../../public/uploads");
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, uploadPath);
    },
    filename(req, file, cb) {
        const ext = path.extname(file.originalname);
        // 안전한 파일 이름 생성: uuid + 확장자
        const safeName = uuidv4() + ext;
        cb(null, safeName);
    },
});

const upload = multer({ storage });

module.exports = upload;
