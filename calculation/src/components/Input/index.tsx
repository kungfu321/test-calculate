import styles from './input.module.css';

interface InputProps {
  value?: string | number | readonly string[] | undefined;
  type?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  style?: React.CSSProperties;
  disabled?: boolean;
}

const Input = (props: InputProps) => {
  return (
    <div className={styles.root}>
      <input className={styles.input} type="text" {...props} />
    </div>
  );
}

export default Input;
