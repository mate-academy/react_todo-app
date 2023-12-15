import React, { useContext } from 'react';

import './ClearButton.scss';
import { TodosContext } from '../../../contexts/TodosContext';

interface Props {
  children: React.ReactNode,
}

const ClearButton: React.FC<Props> = ({
  children,
}) => {
  const { todos, setTodos } = useContext(TodosContext);

  const clearCompletedTasks = () => {
    setTodos((prevTodos) => prevTodos.filter(todo => !todo.completed));
  };

  return (
    todos.length > 0
      ? (
        <button
          type="button"
          className="clear-completed"
          onClick={clearCompletedTasks}
        >
          {children}
        </button>
      )
      : <></>
  );
};

export default ClearButton;
