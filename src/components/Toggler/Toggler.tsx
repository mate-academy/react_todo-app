import React from 'react';
import { ITodo } from '../../types';

type Props = {
  todos: ITodo[];
  setTodos: (todos: ITodo[]) => void;

};

export const Toggler: React.FC<Props> = ({
  todos,
  setTodos,
}) => {
  const toggleAll = () => {
    const allCompleted = todos.every((todo) => todo.completed);

    if (allCompleted) {
      setTodos(todos.map((todo) => ({
        ...todo,
        completed: false,
      })));
    } else {
      setTodos(todos.map((todo) => ({
        ...todo,
        completed: true,
      })));
    }
  };

  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={toggleAll}
      />

      <label
        htmlFor="toggle-all"
      >
        Mark all as complete
      </label>
    </>
  );
};
