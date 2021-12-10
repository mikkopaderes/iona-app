import React from 'react';
import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import { CatImageModel } from 'models/cat-image';
import CatImageProfileCard from '.';

test('given a cat image, when rendering, then it should render its properties', async () => {
  const catImage = new CatImageModel({
    id: 'test_cat_image_1',
    url: 'test_cat_image_1.jpg',
    breeds: [
      {
        id: 'test_breed_1',
        name: 'Name',
        description: 'Description',
        origin: 'United States',
        temperament: 'Temperament',
      }
    ],
  });

  render(
    <BrowserRouter>
      <CatImageProfileCard catImage={catImage} />
    </BrowserRouter>
  );

  expect(await screen.findByTestId('image')).toHaveAttribute('src', catImage.url);
  expect(await screen.findByTestId('title')).toHaveTextContent('Name — United States');
  expect(await screen.findByTestId('description')).toHaveTextContent('Description');
  expect(await screen.findByTestId('temperament')).toHaveTextContent('Temperament');
});
