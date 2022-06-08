import type { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import FormData from 'form-data';
import { Fields, File, Files, IncomingForm } from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

type Data = {
  fields: Fields;
  files: Files;
};

export default async function uploadFormFiles(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // parse form with a Promise wrapper
  const fData = await new Promise<Data>((resolve, reject) => {
    const form = new IncomingForm({ multiples: false });
    form.parse(req, async (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  // const revFile = await fs.readFile(
  //   (fData.files["file"] as File).filepath,
  //   "utf8",
  //   (err, data) => {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //     formData.append("file", data);
  //   }
  // );

  const revFile = fs.readFileSync(
    (fData.files["file"] as File).filepath,
    "utf-8"
  );
  const formData = new FormData();
  formData.append("file", revFile);

  return await axios
    .post(`${process.env.API_URL}/uploadfile/`, formData)
    .catch((err) => console.log("err", err));
}
// return new Promise(async (resolve, reject) => {
//   const form = new Formidable.IncomingForm({
//     multiples: true,
//     keepExtensions: true,
//   });

//   form
//     .on('file', (name: string, file: File) => {
//       const data = fs.readFileSync(file.path);
//       fs.writeFileSync(`public/upload/${file.name}`, data);
//       fs.unlinkSync(file.path);
//     })
//     .on('aborted', () => {
//       reject(res.status(500).send('Aborted'));
//     })
//     .on('end', () => {
//       resolve(res.status(200).send('done'));
//     });

//   await form.parse(req);
// });
