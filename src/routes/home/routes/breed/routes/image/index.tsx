import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { CatImageData, CatImageModel } from 'models/cat-image';
import CatImageProfileCard from './components/cat-image-profile-card';
import styles from './index.module.css';

function HomeBreedImage() {
  const params = useParams();
  const [catImage, setCatImage] = useState<CatImageModel>();

  useEffect(() => {
    async function doEffect() {
      const url = `https://api.thecatapi.com/v1/images/${params.image_id}`;
      const response = await fetch(url);
      const data: CatImageData = await response.json();

      setCatImage(new CatImageModel(data));
    }

    doEffect();
  }, [params.image_id]);

  return (
    <section className={styles.host}>
      <div className={styles.scrim} />

      <div className={styles.card}>
        {catImage && <CatImageProfileCard catImage={catImage} />}
      </div>
    </section>
  );
}

export default HomeBreedImage;
