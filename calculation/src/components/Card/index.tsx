import React from 'react';
import styles from './card.module.css';

interface CardProps {
  children: React.ReactNode;
}

const Card = (props: CardProps) => {
  const { children } = props;

  return (
    <div className={styles.root} {...props}>{children}</div>
  );
}

export default Card;
