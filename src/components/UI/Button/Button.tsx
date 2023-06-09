import styles from './Button.module.scss';

type Props = {
  children: JSX.Element | JSX.Element[];
  title?: string;
  bigSize?: boolean;
  onClick?: () => void;
};

export const Button: React.FC<Props> = ({
  children,
  title,
  bigSize,
  onClick,
}) => {
  const buttonClass = bigSize ? `${styles.button} ${styles.button__big}` : styles.button;

  return (
    <button
      type="submit"
      className={buttonClass}
      title={title}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
