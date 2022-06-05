import { FileRejection, FileWithPath, useDropzone } from 'react-dropzone';

import styled from '@emotion/styled';

import AudioPlayer, { Widget } from '../components/AudioPlayer';
import WallPaper from '../components/Wallpaper';

import type { NextPage } from "next"
type FileRejectionWithPath = FileRejection & {
  file: FileWithPath
}

const fileList = (files: FileWithPath[]) =>
  files.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))

const Home: NextPage = () => {
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    maxFiles: 1,
    accept: {
      "audio/x-wav": [".wav"],
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
      <h1>Online WAV to MIDI Converter</h1>
      <AudioPlayer />
      <DropZoneContainer>
        <div {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
          <input {...getInputProps()} />
          <p>{`Drag 'n' drop wav file here, or click to select`}</p>
          {/* <aside>
            <h4>Accepted Files</h4>
            <ul>{fileList(acceptedFiles)}</ul>
          </aside>
          <aside>
            <h4>Rejected Files</h4>
            {fileRejectionItems}
          </aside> */}
        </div>
      </DropZoneContainer>
      <WallPaper />
    </main>
  )
}

export default Home

const DropZoneContainer = styled(Widget)(({ theme }) => ({
  margin: 50,
  width: "700px",
  height: "300px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}))
