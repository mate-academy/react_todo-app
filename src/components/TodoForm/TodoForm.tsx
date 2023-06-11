import { useState, useRef } from 'react';
import { Button } from '../UI/Button';
import styles from './TodoForm.module.scss';
import { IconAdd } from '../UI/IconAdd';

type Props = {
  onAddTodo: (text: string) => void;
};

export const TodoForm: React.FC<Props> = ({ onAddTodo }) => {
  const [text, setText] = useState('');
  const formInputRef = useRef<HTMLInputElement>(null);

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (text.trim()) {
      onAddTodo(text);
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
        <IconAdd />
      </Button>
    </form>
  );
};
