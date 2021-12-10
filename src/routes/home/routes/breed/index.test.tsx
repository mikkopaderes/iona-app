import React from 'react';
import { render, screen } from '@testing-library/react';

import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { CatImageModel } from 'models/cat-image';
import HomeBreed from '.';

const catImagesData = [
  {
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
  },
  {
    id: 'test_cat_image_2',
    url: 'test_cat_image_2.jpg',
    breeds: [
      {
        id: 'test_breed_1',
        name: 'Name',
        description: 'Description',
        origin: 'United States',
        temperament: 'Temperament',
      }
    ],
  },
];

jest.mock('./components/cat-image-deck', () => (
  function CatImageDeck({
    catImages,
    isLoadMoreDisabled,
  }: { catImages: CatImageModel[], isLoadMoreDisabled: boolean }) {
    return (
      <>
        <div data-testid="cat-image-id">{catImages.length > 0 && catImages[0].id}</div>
        <div data-testid="is-load-more-disabled">{isLoadMoreDisabled}</div>
      </>
    );
  }
));

test('given a breed ID, when rendering, then it should fetch and render the cat images', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(catImagesData),
    }),
  ) as jest.Mock;

  render(
    <MemoryRouter initialEntries={['/test_breed_1']}>
      <Routes>
        <Route path=':breed_id' element={<HomeBreed />} />
      </Routes>
    </MemoryRouter>
  );

  const element = await screen.findByTestId('cat-image-id');

  expect(fetch).toHaveBeenCalledWith('https://api.thecatapi.com/v1/images/search?order=desc&limit=10&page=1&breed_id=test_breed_1');
  expect(element).toHaveTextContent('test_cat_image_1');
});
