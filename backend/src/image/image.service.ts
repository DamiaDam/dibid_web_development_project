import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageService {
  constructor(
  ) { }

//     getFile(bucketName: string, fileName: string) {
//     return new Promise(resolve => {
//       this.minioClient.getObject(bucketName, fileName, (e, dataStream) => {
//         if (e) {
//           console.log(e);
//         }

//         let size = 0;
//         const binary = fs.createWriteStream('tmpFile.png');

//         dataStream.on('data', chunk => {
//           size += chunk.length;
//           binary.write(chunk);
//         });
//         dataStream.on('end', () => {
//           binary.end();
//           resolve(binary);
//         });
//       });
//     });
//   }

}