import { AnimatePresence, motion } from 'framer-motion';
import styles from './Modal.module.scss';
import { Button } from '../UI/Button';
import { IconClose } from '../UI/IconClose';
import modalImg from '../../images/modal-img.svg';

type Props = {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Modal: React.FC<Props> = ({ isOpenModal, setIsOpenModal }) => {
  return (
    <AnimatePresence initial={false}>
      {isOpenModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.6 } }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.overlay}
          onClick={() => setIsOpenModal(false)}
        >
          <motion.div
            initial={{ y: -400, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { delay: 0.6, type: 'spring' },
            }}
            exit={{ y: 400, opacity: 0, transition: { duration: 0.5 } }}
            className={styles.modal}
          >
            <img src={modalImg} alt="modal img" />

            <p>
              Time to chill
              <br />
              You have done all the todos
            </p>

            <div className={styles.button}>
              <Button onClick={() => setIsOpenModal(false)}>
                <IconClose />
              </Button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
