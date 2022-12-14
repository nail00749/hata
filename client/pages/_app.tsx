import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { DevSupport } from '@react-buddy/ide-toolbox';
import { ComponentPreviews, useInitial } from '../dev';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { wrapper } from '../store';
import 'leaflet/dist/leaflet.css';
import { Provider } from 'react-redux';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, ...rest }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store = {store}>
      {
        getLayout(
          <DevSupport
            ComponentPreviews = {ComponentPreviews}
            useInitialHook = {useInitial}
          >
            <Component {...props.pageProps} />
          </DevSupport>,
        )}
    </Provider>
  );
}

export default MyApp;
