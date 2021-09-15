import path from 'path'
import express from 'express'
import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        // note, normallt, we could have the file unformatted(using filename directly)
        // however, to avoid naming conflicts.... let's do some formatting

        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

function checkFileType (file, cb) {
    const types = /jpg|png|jpeg/
    const extensionName = types.test(path.extname(file.originalname).toLocaleLowerCase())
    const mimetype = types.test(file.mimetype)
    if(extensionName && mimetype){
        return cb(null, true)
    }else{
        cb('Only Images are allowed')
    }
}
const upload = multer({
    //note: using storage alone will allow uploading of differnet filetypes which isnt suitable atm
    storage,
    fileFilter: function(req, file, cb){
        checkFileType(file, cb) 
    }  
})

router.post('/', upload.single('image'), (req, res)=>{
    console.log(req.file)
    res.send(`/${req.file.path}`)
})

export default router