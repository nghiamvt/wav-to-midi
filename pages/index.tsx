import { FileRejection, FileWithPath, useDropzone } from 'react-dropzone';

import styled from '@emotion/styled';
import { Typography } from '@mui/material';

import AudioPlayer from '../components/AudioPlayer';
import { Card } from '../components/Card';
import WallPaper from '../components/Wallpaper';

type FileRejectionWithPath = FileRejection & {
  file: FileWithPath
}

const fileList = (files: FileWithPath[]) =>
  files.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))

export default function Home() {
  const { getRootProps, getInputProps, acceptedFiles, fileRejections } =
    useDropzone({
      maxFiles: 1,
      accept: { "audio/x-wav": [".wav"] },
      onDropRejected: (files) => {
        console.log(files)
      },
    })

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
  )

  return (
    <main>
      <Typography variant="h3" mb={8}>
        WAV to MIDI
      </Typography>
      <AudioPlayer />
      <DropZoneContainer>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>{`Drag 'n' drop wav file here, or click to select`}</p>
          {/* <aside>
            <h4>Accepted Files</h4>
            <ul>{fileList(acceptedFiles)}</ul>
          </aside>*/}
        </div>
      </DropZoneContainer>
      <WallPaper />
    </main>
  )
}

const DropZoneContainer = styled(Card)({
  margin: 50,
  width: "700px",
  height: "300px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
})
