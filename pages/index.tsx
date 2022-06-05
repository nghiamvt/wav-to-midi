import type { NextPage } from "next"
import Head from 'next/head';
import { DropzoneState, FileRejection, FileWithPath, useDropzone } from 'react-dropzone';
import styled from 'styled-components';

type FileRejectionWithPath = FileRejection & {
  file: FileWithPath
}

const fileList = (files: FileWithPath[]) =>
  files.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))

const getColor = (props: DropzoneState) => {
  if (props.isDragAccept) {
    return "#00e676"
  }
  if (props.isDragReject) {
    return "#ff1744"
  }
  if (props.isFocused) {
    return "#2196f3"
  }
  return "#eeeeee"
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props as any)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`

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
    <>
      <Head>
        <title>Online WAV to MIDI Converter</title>
      </Head>

      <main>
        <h1>Online WAV to MIDI Converter</h1>
        <div className="container">
          <Container
            {...getRootProps({ isFocused, isDragAccept, isDragReject })}
          >
            <input {...getInputProps()} />
            <p>{`Drag 'n' drop some files here, or click to select files`}</p>
            <aside>
              <h4>Accepted Files</h4>
              <ul>{fileList(acceptedFiles)}</ul>
            </aside>
            <aside>
              <h4>Rejected Files</h4>
              {fileRejectionItems}
            </aside>
          </Container>
        </div>
      </main>
    </>
  )
}

export default Home
