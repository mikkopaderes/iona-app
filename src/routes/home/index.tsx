import React, { useEffect, useState } from 'react';

import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/container';

import { BreedData, BreedModel } from 'models/breed';
import TopBar from './components/top-bar';

function Home() {
  const params = useParams();
  const [breeds, setBreeds] = useState<BreedModel[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<BreedModel | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function doEffect() {
      const response = await fetch('https://api.thecatapi.com/v1/breeds');
      const data: BreedData[] = await response.json();

      setBreeds(data.map((item) => new BreedModel(item)));
    }

    doEffect();
  }, []);

  useEffect(() => {
    if (params.breed_id) {
      setSelectedBreed(breeds.find((breed) => breed.id === params.breed_id) || null);
    }
  }, [params.breed_id, breeds]);

  const handleBreedChange = (breed: BreedModel) => {
    setSelectedBreed(breed);
    navigate(`/${breed.id}`);
  };

  return (
    <Container>
      <TopBar breeds={breeds} selectedBreed={selectedBreed} onBreedChange={handleBreedChange} />
      <Outlet />
    </Container>
  );
}

export default Home;
