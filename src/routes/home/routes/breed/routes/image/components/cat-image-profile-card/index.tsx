import React from 'react';

import { LinkContainer } from 'react-router-bootstrap';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { CatImageModel } from 'models/cat-image';
import styles from './index.module.css';

interface CatImageProfileCardProps {
  catImage: CatImageModel;
}

function CatImageProfileCard({ catImage }: CatImageProfileCardProps) {
  const params = useParams();

  return (
    <Card className={styles.host}>
      <Card.Header>
        <LinkContainer to={`/${params.breed_id}`}>
          <Button>Back</Button>
        </LinkContainer>
      </Card.Header>

      <Card.Img className={styles.image} data-testid="image" src={catImage.url} />
      <Card.Body>
        <Card.Title data-testid="title">{`${catImage.breedName} — ${catImage.origin}`}</Card.Title>

        <Card.Subtitle className="mb-2 text-muted" data-testid="temperament">
          {catImage.temperament}
        </Card.Subtitle>

        <Card.Text data-testid="description">{catImage.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CatImageProfileCard;
