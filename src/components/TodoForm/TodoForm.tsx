import React, { useState } from 'react';
import { Todo } from '../../types/types';

type Props = {
  todos: Todo[],
  setTodos: (value: Todo[]) => void,
  setVisibleTodos: (value: Todo[]) => void,
  setIsToggled: (value: boolean) => void,
  isToggled: boolean,
};

export const TodoForm:React.FC<Props> = ({
  todos, setTodos, setVisibleTodos, setIsToggled, isToggled,
}) => {
  const [formValue, setFormValue] = useState('');
  const createTodo = () => {
    if (formValue.trim()) {
      const todo = {
        id: +new Date(),
        title: formValue,
        completed: false,
      };

      setIsToggled(!isToggled);

      setTodos([
        ...todos,
        todo,
      ]);
      setVisibleTodos([
        ...todos,
        todo,
      ]);
    }

    setFormValue('');
  };

  const checkKey = (event: { key: string; preventDefault: () => void; }) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      createTodo();
    }
  };

  return (
    <form>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={formValue}
        onChange={(event) => {
          setFormValue(event.target.value);
        }}
        onKeyDown={checkKey}
      />
    </form>
  );
};
