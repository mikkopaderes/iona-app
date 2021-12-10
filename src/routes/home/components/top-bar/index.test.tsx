import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { BreedModel } from 'models/breed';
import TopBar from '.';

const breeds = [
  new BreedModel({
    id: 'test_breed_1',
    name: 'Name 1',
    description: 'Description 1',
    origin: 'Origin 1',
    temperament: 'Temperament 1',
  }),
  new BreedModel({
    id: 'test_breed_2',
    name: 'Name 2',
    description: 'Description 2',
    origin: 'Origin 2',
    temperament: 'Temperament 2',
  }),
];

test('given a list of breed, when rendering, then it should render each one', async () => {
  const selectedBreed = null;
  const onBreedChange = jest.fn();

  render(<TopBar breeds={breeds} selectedBreed={selectedBreed} onBreedChange={onBreedChange} />);

  const elements = await screen.findAllByTestId('breed-option');

  expect(elements.length).toBe(2);
  expect(elements[0]).toHaveValue('test_breed_1');
  expect(elements[0]).toHaveTextContent('Name 1');
  expect(elements[1]).toHaveValue('test_breed_2');
  expect(elements[1]).toHaveTextContent('Name 2');
});

test('given a selected breed, when rendering, then it should preselect the breed', async () => {
  const selectedBreed = breeds[2];
  const onBreedChange = jest.fn();

  render(<TopBar breeds={breeds} selectedBreed={selectedBreed} onBreedChange={onBreedChange} />);

  const element = await screen.findByTestId('breed-field');

  expect(element).toHaveValue('test_breed_2');
});

test('given a rendered list of breed, when selecting one, then it should trigger an external function', async () => {
  const selectedBreed = null;
  const onBreedChange = jest.fn();

  render(<TopBar breeds={breeds} selectedBreed={selectedBreed} onBreedChange={onBreedChange} />);

  const element = await screen.findByTestId('breed-field');

  fireEvent.change(element, { target: { value: 'test_breed_2' } });

  expect(onBreedChange).toBeCalledWith(breeds[1]);
});
