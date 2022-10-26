import React from 'react';
import { ComponentPreview, Previews } from '@react-buddy/ide-toolbox';
import { PaletteTree } from './palette';
import { Layout } from '../components/UI/Layout';
import Page from '../pages/[page]';
import { InfoRent } from '../components/Rent/InfoRent';

const ComponentPreviews = () => {
  return (
    <Previews palette = {<PaletteTree />}>
      <ComponentPreview path = '/Layout'>
        <Layout />
      </ComponentPreview>
      <ComponentPreview path = '/Page'>
        <Page />
      </ComponentPreview>
      <ComponentPreview path = '/InfoRent'>
        <InfoRent />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
