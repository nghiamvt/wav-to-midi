import { FileRejection, FileWithPath, useDropzone } from 'react-dropzone';
import { AudioPlayerProvider } from 'react-use-audio-player';

import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';

import AudioPlayer from '../components/AudioPlayer';
import { Card } from '../components/Card';
import WallPaper from '../components/Wallpaper';

export type FileRejectionWithPath = FileRejection & {
  file: FileWithPath;
};

const fileList = (files: FileWithPath[]) =>
  files.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

const getErrMsg = (fileRejections: FileRejectionWithPath[]): string => {
  if (fileRejections.length === 0) return '';
  const err = fileRejections[0].errors[0];

  return (
    {
      'file-invalid-type': 'Sorry! Only WAV files are allowed 😔',
    }[err.code] || err.message
  );
};

export default function Home() {
  const { getRootProps, getInputProps, acceptedFiles, fileRejections } =
    useDropzone({
      maxFiles: 1,
      accept: { 'audio/x-wav': ['.wav'] },
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
                ☝️ Uploaded: {file.path} {`(${file.size} bytes)`}
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
  width: '700px',
  height: '300px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
});
