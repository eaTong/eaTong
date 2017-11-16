/**
 * Created by eatong on 17-11-10.
 */
import fs from 'fs';
import path from 'path';
import {v4} from 'uuid';

export default class FileApi {

  static async uploadImage(ctx) {
    const file = ctx.request.body.files.file;
    const reader = fs.createReadStream(file.path);
    const fileName = v4() + file.name.slice(file.name.lastIndexOf('.'), file.name.length);
    const filePath = path.resolve('static/upload/img', fileName);
    const stream = fs.createWriteStream(filePath);
    reader.pipe(stream);
    return fileName;
  }
}
