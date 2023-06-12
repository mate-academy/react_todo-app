import { useEffect, useMemo, useState } from 'react';
import { Todo } from '../../types/Todo';
import styles from './ProgressBar.module.scss';

type Props = {
  todos: Todo[];
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const COLORS = ['red', 'orange', 'yellow', 'lightgreen', 'green'];

export const ProgressBar: React.FC<Props> = ({ todos, setIsOpenModal }) => {
  const [isFirstRender, setIsFirstRender] = useState(true);

  const numberOfCompleted = useMemo(() => (
    todos.filter(todo => todo.completed).length
  ), [todos]);

  const progress = useMemo(() => (
    Math.round((numberOfCompleted * 100) / todos.length) || 0
  ), [numberOfCompleted]);

  const colorIndex = Math.round(progress / 20);
  const fillColor = COLORS[colorIndex - 1];

  useEffect(() => {
    if (progress === 100 && !isFirstRender) {
      setIsOpenModal(true);
    }

    setIsFirstRender(false);
  }, [progress]);

  return (
    <div className={styles.container}>
      <div
        style={{ backgroundColor: fillColor, width: `${progress}%` }}
        className={styles.progressbar}
      />
    </div>
  );
};
