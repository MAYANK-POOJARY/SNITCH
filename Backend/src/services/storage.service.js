import { config } from "../config/config.js";
import ImageKit from '@imagekit/nodejs';

const client = new ImageKit({
  privateKey: config.IMAGE_KIT_KEY
});

export async function uploadFile({buffer, fileName, folder = "snitch"}){
    const result = await client.files.upload({
        file: await ImageKit.toFile(buffer),
        fileName,
        folder
    })

    return result;
}