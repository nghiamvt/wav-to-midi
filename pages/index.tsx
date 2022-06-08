import axios from 'axios';
import { FileRejection, FileWithPath, useDropzone } from 'react-dropzone';
import { AudioPlayerProvider } from 'react-use-audio-player';

import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';

import AudioPlayer from '../components/AudioPlayer';
import { Card } from '../components/Card';
import WallPaper from '../components/Wallpaper';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export type FileRejectionWithPath = FileRejection & {
  file: FileWithPath;
};

const getErrMsg = (fileRejections: FileRejectionWithPath[]): string => {
  if (fileRejections.length === 0) return "";
  const err = fileRejections[0].errors[0];

  return (
    {
      "file-invalid-type": "Sorry! Only WAV files are allowed 😔",
    }[err.code] || err.message
  );
};

function formatBytes(bytes: any, decimals: any) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export default function Home() {
  const { getRootProps, getInputProps, acceptedFiles, fileRejections } =
    useDropzone({
      maxFiles: 1,
      accept: { "audio/x-wav": [".wav"] },
      onDropAccepted: async (files: FileWithPath[]) => {
        const formData = new FormData();
        formData.append("file", files[0]);
        const uploadRes = await axios
          .post("/uploadfile", formData)
          .then((res) => res.data);
      },
    });

  const errMsg = getErrMsg(fileRejections);

  const file: FileWithPath = acceptedFiles[0];
  return (
    <main>
      <Typography variant="h3" mb={8}>
        WAV to MIDI
      </Typography>
      <AudioPlayerProvider>
        <AudioPlayer file={acceptedFiles[0]} />
      </AudioPlayerProvider>
      <DropZoneContainer>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {!!file && (
            <>
              <p>
                ☝️ Uploaded: {file.path} {`(${formatBytes(file.size, 2)})`}
              </p>
              <Button variant="contained" size="large">
                <Typography>Convert</Typography>
              </Button>
            </>
          )}
          {acceptedFiles.length === 0 && !errMsg && (
            <p>{`Drag 'n' drop wav file here, or click to select`}</p>
          )}
          {errMsg && <p>{errMsg}</p>}
        </div>
      </DropZoneContainer>
      <WallPaper />
    </main>
  );
}

const DropZoneContainer = styled(Card)({
  margin: 50,
  width: "700px",
  height: "300px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
});
