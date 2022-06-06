import { useState } from 'react';
import { DropzoneState, FileRejection, FileWithPath, useDropzone } from 'react-dropzone';
import { AudioPlayerProvider, useAudioPlayer } from 'react-use-audio-player';

import styled from '@emotion/styled';
import { Typography } from '@mui/material';

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

  console.log('acceptedFiles', acceptedFiles);
  console.log('errMsg', errMsg);

  return (
    <main>
      <Typography variant="h3" mb={8}>
        WAV to MIDI
      </Typography>
      <AudioPlayerProvider>
        <AudioPlayer />
      </AudioPlayerProvider>
      <DropZoneContainer>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {acceptedFiles.length > 0 && (
            <aside>
              <ul>{fileList(acceptedFiles)}</ul>
            </aside>
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
});
