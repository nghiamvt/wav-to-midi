import type { NextApiRequest, NextApiResponse } from 'next';
import { Fields, Files, IncomingForm } from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

type Data = {
  err: any;
  fields: Fields;
  files: Files;
};

export default async function uploadFormFiles(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // parse form with a Promise wrapper
  await new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
      res.status(200).json({ err, fields, files });
    });
  });

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
}
