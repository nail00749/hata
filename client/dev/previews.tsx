import React from 'react';
import { ComponentPreview, Previews } from '@react-buddy/ide-toolbox';
import { PaletteTree } from './palette';
import { Layout } from '../components/UI/Layout';
import Page from '../pages';

const ComponentPreviews = () => {
  return (
    <Previews palette = {<PaletteTree />}>
      <ComponentPreview path = '/Layout'>
        <Layout />
      </ComponentPreview>
      <ComponentPreview path = '/Page'>
        <Page />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
