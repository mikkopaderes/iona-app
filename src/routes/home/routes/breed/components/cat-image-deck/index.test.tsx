import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { CatImageModel } from 'models/cat-image';
import CatImageDeck from '.';

const catImages = [
  new CatImageModel({
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
  new CatImageModel({
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
  }),
];

jest.mock('../cat-image-card', () => (
  function CatImageCard() {
    return <div data-testid="cat-image-card" />;
  }
));

test('given a list of cat images, when rendering, then it should render each one', async () => {
  const isLoadMoreButtonDisabled = false;
  const onLoadMoreClick = jest.fn();

  render(<CatImageDeck
    catImages={catImages}
    isLoadMoreDisabled={isLoadMoreButtonDisabled}
    onLoadMoreClick={onLoadMoreClick}
  />);

  const elements = await screen.findAllByTestId('cat-image-card');

  expect(elements.length).toBe(2);
});

test('given a state to enable load more button, when rendering, then it should enable load more button', async () => {
  const isLoadMoreButtonDisabled = false;
  const onLoadMoreClick = jest.fn();

  render(<CatImageDeck
    catImages={catImages}
    isLoadMoreDisabled={isLoadMoreButtonDisabled}
    onLoadMoreClick={onLoadMoreClick}
  />);

  const element = await screen.findByTestId('load-more-button');

  expect(element).toBeEnabled();
});

test('given a state to disable load more button, when rendering, then it should disable load more button', async () => {
  const isLoadMoreButtonDisabled = true;
  const onLoadMoreClick = jest.fn();

  render(<CatImageDeck
    catImages={catImages}
    isLoadMoreDisabled={isLoadMoreButtonDisabled}
    onLoadMoreClick={onLoadMoreClick}
  />);

  const element = await screen.findByTestId('load-more-button');

  expect(element).toBeDisabled();
});

test('given a rendered component, when clicking load more, then it should fire an external function', async () => {
  const isLoadMoreButtonDisabled = false;
  const onLoadMoreClick = jest.fn();

  render(<CatImageDeck
    catImages={catImages}
    isLoadMoreDisabled={isLoadMoreButtonDisabled}
    onLoadMoreClick={onLoadMoreClick}
  />);

  const element = await screen.findByTestId('load-more-button');

  fireEvent.click(element);

  expect(onLoadMoreClick).toBeCalled();
});
