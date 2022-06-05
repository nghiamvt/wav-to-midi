import '../styles/globals.css';

import Head from 'next/head';
import { FunctionComponent, PropsWithChildren } from 'react';

import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

import type { AppProps } from "next/app"
const SafeHydrate: FunctionComponent<PropsWithChildren<unknown>> = ({
  children,
}) => {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  )
}

const theme = createTheme({
  typography: {
    fontFamily: ["Lato", "sans-serif"].join(","),
    h3: {
      fontWeight: 700,
      color: "rgba(255,255,255,0.4)",
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SafeHydrate>
      <Head>
        <title>Online WAV to MIDI Converter</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
      <CssBaseline />
    </SafeHydrate>
  )
}

export default MyApp
