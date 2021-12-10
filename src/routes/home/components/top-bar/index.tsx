import React from 'react';

import Form from 'react-bootstrap/Form';

import { BreedModel } from 'models/breed';
import styles from './index.module.css';

interface TopBarProps {
  breeds: BreedModel[];
  selectedBreed: BreedModel | null;
  onBreedChange(breed: BreedModel): void;
}

function TopBar({ breeds, selectedBreed, onBreedChange }: TopBarProps) {
  function handleBreedChange(id: string) {
    const newSelectedBreed = breeds.find((breed) => breed.id === id);

    if (newSelectedBreed) {
      onBreedChange(newSelectedBreed);
    }
  }

  return (
    <div className={styles.host}>
      <Form.Select
        className={styles.breedField}
        data-testid="breed-field"
        value={selectedBreed?.id}
        onChange={(e) => handleBreedChange(e.target.value)}
      >
        <option value="">Select a breed</option>

        {breeds.map((breed) => (
          <option data-testid="breed-option" value={breed.id} key={breed.id}>{breed.name}</option>
        ))}
      </Form.Select>
    </div>
  );
}

export default TopBar;
