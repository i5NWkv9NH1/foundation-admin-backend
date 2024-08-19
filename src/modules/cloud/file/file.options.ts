import { diskStorage } from 'multer'
import { v4 as uuidv4 } from 'uuid'

export const multerOptions = {
  storage: diskStorage({
    destination: './uploads/cloud',
    filename: (req, file, cb) => {
      const uniqueName = `${uuidv4()}-${file.originalname}`
      cb(null, uniqueName)
    }
  })
}
