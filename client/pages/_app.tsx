import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { DevSupport } from '@react-buddy/ide-toolbox';
import { ComponentPreviews, useInitial } from '../dev';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import 'leaflet/dist/leaflet.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store = {store}>
      {getLayout(
        <DevSupport
          ComponentPreviews = {ComponentPreviews}
          useInitialHook = {useInitial}
        >
          <Component {...pageProps} />
        </DevSupport>)}
    </Provider>);
}

export default MyApp;
