import { diskStorage } from 'multer';

const fileName = (req, file, callback) => {
  callback(null, file.originalname);
}; //необходимо для работы с картинкой

export const fileStorage = diskStorage({
  destination: './db_images/decorations', //название папки должно соответствовать названию штуки, над которой работаем
  filename: fileName, //имя файла будет такое же, какое передал клиент
});
