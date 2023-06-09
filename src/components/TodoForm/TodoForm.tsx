import { useState, useRef } from 'react';
import { Button } from '../UI/Button';
import styles from './TodoForm.module.scss';

type Props = {
  handleAddTodo: (text: string) => void;
};

export const TodoForm: React.FC<Props> = ({ handleAddTodo }) => {
  const [text, setText] = useState('');
  const formInputRef = useRef<HTMLInputElement>(null);

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (text.trim()) {
      handleAddTodo(text);
      setText('');
    }

    if (formInputRef.current) {
      formInputRef.current.focus();
    }
  };

  return (
    <form
      className={styles.todoForm}
      onSubmit={handleOnSubmit}
    >
      <input
        type="text"
        placeholder="&#9997; Today I need to..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        ref={formInputRef}
      />

      <Button bigSize>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="#9baacf"
        >
          <g id="add">
            <path id="plus" d="M13 6h-2v5H6v2h5v5h2v-5h5v-2h-5z" />
          </g>
        </svg>
      </Button>
    </form>
  );
};
