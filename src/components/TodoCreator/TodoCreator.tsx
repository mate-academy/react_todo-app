import React, { useState, useContext } from 'react';
import { TodosContext } from '../TodosContext';
import { ActionType } from '../../types/Action';
import { Todo } from '../../types/Todo';

export const TodoCreator: React.FC = () => {
  const [text, setText] = useState('');
  const { dispatch } = useContext(TodosContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo: Todo = {
      title: text,
      id: +new Date(),
      completed: false,
    };

    dispatch({ type: ActionType.AddTodo, payload: newTodo });
    setText('');
  };

  return (
    <header className="header">
      <h1>todos</h1>

      <form
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      </form>
    </header>
  );
};
