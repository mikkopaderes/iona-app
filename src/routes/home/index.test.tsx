import React from 'react';
import { render, screen } from '@testing-library/react';

import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { CatImageModel } from 'models/cat-image';
import Home from '.';

const breedsData = [
  {
    id: 'test_breed_1',
    name: 'Name 1',
    description: 'Description 1',
    origin: 'Origin 1',
    temperament: 'Temperament 1',
  },
  {
    id: 'test_breed_2',
    name: 'Name 2',
    description: 'Description 2',
    origin: 'Origin 2',
    temperament: 'Temperament 2',
  },
];

test('given a component, when rendering, then it should fetch all breeds and render it in select field', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(breedsData),
    }),
  ) as jest.Mock;

  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </MemoryRouter>
  );

  const elements = await screen.findAllByTestId('breed-option');

  expect(fetch).toHaveBeenCalledWith('https://api.thecatapi.com/v1/breeds');
  expect(elements.length).toBe(2);
  expect(elements[0]).toHaveValue('test_breed_1');
  expect(elements[0]).toHaveTextContent('Name 1');
  expect(elements[1]).toHaveValue('test_breed_2');
  expect(elements[1]).toHaveTextContent('Name 2');
});
