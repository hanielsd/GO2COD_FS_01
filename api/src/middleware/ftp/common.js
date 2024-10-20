const multer = require('multer')
const shortid = require('shortid')

const renameFile = (req, file, cb) => {
  const prefix = Date.now() + '-' + Math.round(Math.random() * 1e9)
  const fileNameSplitted = file.originalname.split('.')
  const extension = fileNameSplitted[fileNameSplitted.length - 1]
  const filename = prefix + '-' + shortid.generate() + '.' + extension
  req.fileName = filename

  cb(null, filename)
}

const getStorage = (path) =>
  multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path)
    },
    filename: renameFile,
  })

module.exports = { getStorage }
