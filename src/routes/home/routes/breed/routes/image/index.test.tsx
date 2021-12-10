import React from 'react';
import { render, screen } from '@testing-library/react';

import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { CatImageModel } from 'models/cat-image';
import HomeBreedImage from '.';

jest.mock('./components/cat-image-profile-card', () => (
  function CatImageProfileCard({ catImage }: { catImage: CatImageModel }) {
    return <div data-testid="cat-image-id">{catImage.id}</div>;
  }
));

test('given a cat image ID, when rendering, then it should fetch and render the cat image', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({
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
      }),
    }),
  ) as jest.Mock;

  render(
    <MemoryRouter initialEntries={['/test_cat_image_1']}>
      <Routes>
        <Route path=':image_id' element={<HomeBreedImage />} />
      </Routes>
    </MemoryRouter>
  );

  const element = await screen.findByTestId('cat-image-id');

  expect(fetch).toHaveBeenCalledWith('https://api.thecatapi.com/v1/images/test_cat_image_1');
  expect(element).toHaveTextContent('test_cat_image_1');
});
