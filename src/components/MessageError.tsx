import styles from './styles/messageError.module.scss';

interface Message {
  errorMessage: string;
  closeError: () => void;
}

const MessageError: React.FC<Message> = ({ errorMessage, closeError }) => {
  return (
    <article className={`${styles.errorMessage}`}>
      <div className={styles.errorMessage__header}>
        <p className={styles.errorMessage__title}>Error</p>
        <p className={styles.errorMessage__close} onClick={closeError}>
          x
        </p>
      </div>
      <div className={styles.errorMessage__body}>{errorMessage}</div>
    </article>
  );
};

export default MessageError;
