import React from 'react';

import { render } from '@testing-library/react';
import { Image } from '../../src/client/components/Image';
import '@testing-library/jest-dom/extend-expect';

describe('The image component', () => {
  test('With custom className', () => {
    render(<Image className={'card-img-top'} />);
    const testImage = document.querySelector('img');
    expect(testImage).toHaveClass('Image', 'card-img-top');
  });
  
  test('Without custom className', () => {
    render(<Image />);
    const testImage = document.querySelector('img');
    expect(testImage).toHaveClass('Image');
  });

  test('Src correct', () => {
    render(<Image />);
    const testImage = document.querySelector('img');
    expect(testImage).toHaveAttribute(
      'src',
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkMAYAADkANVKH3ScAAAAASUVORK5CYII='
    );
  });
});
