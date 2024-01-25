import React, { useContext, useState } from 'react';

import './NewTodo.scss';
import { Todo } from '../../../types/Todo';
import { TodosContext } from '../../../contexts/TodosContext';
import getNewIdFor from '../../../utils/getNewIdFor';

const NewTodo: React.FC = () => {
  const { setTodos } = useContext(TodosContext);
  const [todoTitle, setTodoTitle] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!todoTitle.trim()) {
      return;
    }

    setTodoTitle('');

    setTodos((prevTodos: Todo[]) => {
      const newTodo: Todo = {
        id: getNewIdFor(prevTodos),
        title: event.target.value.trim(),
        completed: false,
      };

      return [...prevTodos, newTodo];
    });
  };

  const handleInputKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Enter':
        (event.target as HTMLInputElement).blur();
        break;
      case 'Escape':
        setTodoTitle('');
        break;
      default:
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={todoTitle}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyUp={handleInputKeyUp}
      />
    </form>
  );
};

export default NewTodo;
