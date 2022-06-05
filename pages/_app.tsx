import '../styles/globals.css';

import { FunctionComponent, PropsWithChildren } from 'react';

import { CssBaseline } from '@mui/material';

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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SafeHydrate>
      <Component {...pageProps} />
      <CssBaseline />
    </SafeHydrate>
  )
}

export default MyApp
