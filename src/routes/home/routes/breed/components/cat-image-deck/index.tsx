import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { CatImageModel } from 'models/cat-image';
import CatImageCard from '../cat-image-card';
import styles from './index.module.css';

interface CatImageDeckProps {
  catImages: CatImageModel[];
  isLoadMoreDisabled: boolean;
  onLoadMoreClick(): void;
}

function CatImageDeck({ catImages, isLoadMoreDisabled, onLoadMoreClick }: CatImageDeckProps) {
  return (
    <>
      <Row className="g-3" xs={1} md={4}>
        {catImages.map((catImage) => (
          <Col key={catImage.id}>
            <CatImageCard catImage={catImage} />
          </Col>
        ))}
      </Row>

      <Button
        className={styles.loadMoreButton}
        data-testid="load-more-button"
        disabled={isLoadMoreDisabled}
        onClick={onLoadMoreClick}
      >
        Load More
      </Button>
    </>
  );
}

export default CatImageDeck;
