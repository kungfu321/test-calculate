import React from 'react';
import styles from './button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
}

const Button = (props: ButtonProps) => {
  const { children, loading, onClick } = props;

  return (
    <button className={styles.root} onClick={onClick}>{loading ? 'Loading...' : children}</button>
  );
}

export default Button;
