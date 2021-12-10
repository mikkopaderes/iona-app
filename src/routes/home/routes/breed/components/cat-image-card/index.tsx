import React from 'react';

import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

import { CatImageModel } from 'models/cat-image';
import styles from './index.module.css';

interface CatImageCardProps {
  catImage: CatImageModel;
}

function CatImageCard({ catImage }: CatImageCardProps) {
  return (
    <Card className={styles.host}>
      <Card.Img className={styles.image} data-testid="image" variant="top" src={catImage.url} />
      <Link className={styles.primaryLink} to={`images/${catImage.id}`} />
    </Card>
  );
}

export default CatImageCard;
