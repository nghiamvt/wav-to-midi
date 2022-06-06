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

export default function Home() {
  const { getRootProps, getInputProps, acceptedFiles, fileRejections } =
    useDropzone({
      maxFiles: 1,
      accept: { "audio/x-wav": [".wav"] },
      onDropRejected: (files) => {
        console.log(files);
      },
    });

  const fileRejectionItems = fileRejections.map(
    ({ file, errors }: FileRejectionWithPath) => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
        <ul>
          {errors.map((e) => (
            <li key={e.code}>{e.message}</li>
          ))}
        </ul>
      </li>
    )
  );

  console.log("home", acceptedFiles);

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
          {!!acceptedFiles.length ? (
            <aside>
              <ul>{fileList(acceptedFiles)}</ul>
            </aside>
          ) : (
            <p>{`Drag 'n' drop wav file here, or click to select`}</p>
          )}
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
});
