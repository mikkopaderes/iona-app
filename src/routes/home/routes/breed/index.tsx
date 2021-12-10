import React, { useEffect, useState } from 'react';

import { Outlet, useParams } from 'react-router-dom';

import { CatImageData, CatImageModel } from 'models/cat-image';
import CatImageDeck from './components/cat-image-deck';

async function fetchCatImages(breedId: string, page: number = 1): Promise<CatImageModel[]> {
  const url = `https://api.thecatapi.com/v1/images/search?order=desc&limit=10&page=${page}&breed_id=${breedId}`;
  const response = await fetch(url);
  const data: CatImageData[] = await response.json();

  return data.map((item) => new CatImageModel(item));
}

function buildUniqueCatImages(
  currentCatImages: CatImageModel[],
  newCatImages: CatImageModel[],
): CatImageModel[] {
  const uniqueCatImages = [...currentCatImages];

  newCatImages.forEach((catImage) => {
    if (uniqueCatImages.find((uniqueCatImage) => uniqueCatImage.id === catImage.id)) {
      return;
    }

    uniqueCatImages.push(catImage);
  });

  return uniqueCatImages;
}

function HomeBreed(): JSX.Element {
  const params = useParams();
  const [catImages, setCatImages] = useState<CatImageModel[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoadMoreDisabled, setIsLoadMoreDisabled] = useState<boolean>(false);

  useEffect(() => {
    async function doEffect() {
      const newCatImages = await fetchCatImages(params.breed_id as string);

      setCatImages(newCatImages);
    }

    doEffect();
  }, [params.breed_id]);

  useEffect(() => {
    setIsLoadMoreDisabled(false);
  }, [params.breed_id]);

  const handleLoadMoreClick = async () => {
    const nextCatImages = await fetchCatImages(params.breed_id as string, page + 1);
    const newCatImages = buildUniqueCatImages(catImages, nextCatImages);

    if (newCatImages.length > catImages.length) {
      setCatImages(newCatImages);
      setPage(page + 1);
    } else {
      setIsLoadMoreDisabled(true);
    }
  };

  return (
    <>
      <CatImageDeck
        catImages={catImages}
        isLoadMoreDisabled={isLoadMoreDisabled}
        onLoadMoreClick={handleLoadMoreClick}
      />
      <Outlet />
    </>
  );
}

export default HomeBreed;
