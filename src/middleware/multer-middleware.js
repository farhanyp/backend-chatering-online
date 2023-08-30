import multer from 'multer'

const storage = multer.memoryStorage(); // Menggunakan memory storage untuk menyimpan data gambar dalam buffer
const upload = multer({ storage: storage })

export{
    upload
}