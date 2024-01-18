/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { TodosContext } from './Store';

export const TodoFilter: React.FC = () => {
  const {
    todos,
    setTodos,
    setFilteredTodos,
  } = useContext(TodosContext);

  const [selectedAll, setSelectedAll] = useState(true);
  const [selectedActive, setSelectedActive] = useState(false);
  const [selectedCompleted, setSelectedCompleted] = useState(false);
  const [itemsLeft, setItemsLeft] = useState(() => {
    return todos.filter(todo => todo.complete === false).length;
  });
  const [hasCompletedItems, setHasCompletedItems] = useState(() => {
    return todos.some(todo => todo.complete === true);
  });

  const handleAllItems = () => {
    const allItems = todos;

    setSelectedAll(true);
    setSelectedActive(false);
    setSelectedCompleted(false);
    setFilteredTodos(allItems);
  };

  const handleActiveItems = () => {
    const activeItems = todos.filter(todo => todo.complete === false);

    setSelectedAll(false);
    setSelectedActive(true);
    setSelectedCompleted(false);
    setFilteredTodos(activeItems);
  };

  const handleCompletedItems = () => {
    const activeItems = todos.filter(todo => todo.complete === true);

    setSelectedAll(false);
    setSelectedActive(false);
    setSelectedCompleted(true);
    setFilteredTodos(activeItems);
  };

  const handleClearCompleted = () => {
    const clearCompleted = todos.filter(todo => todo.complete === false);

    setTodos(clearCompleted);
  };

  // useEffect for to show count items left
  useEffect(() => {
    setItemsLeft(() => {
      return todos.filter(todo => todo.complete === false).length;
    });
  }, [todos]);

  // useEffect for updating completed items
  useEffect(() => {
    setHasCompletedItems(() => {
      return todos.some(todo => todo.complete === true);
    });
  }, [todos]);

  // useEffect for updating filtered todos
  useEffect(() => {
    if (selectedAll) {
      handleAllItems();
    }

    if (selectedActive) {
      handleActiveItems();
    }

    if (selectedCompleted) {
      handleCompletedItems();
    }
  }, [todos]);

  return (
    <>
      <span className="todo-count" data-cy="todosCounter">
        {`${itemsLeft} items left`}
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={cn({ selected: selectedAll })}
            onClick={handleAllItems}
          >
            All
          </a>
        </li>

        <li>
          <a
            href="#/active"
            className={cn({ selected: selectedActive })}
            onClick={handleActiveItems}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#/completed"
            className={cn({ selected: selectedCompleted })}
            onClick={handleCompletedItems}
          >
            Completed
          </a>
        </li>
      </ul>

      {hasCompletedItems && (
        <button
          type="button"
          className="clear-completed"
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      )}
    </>
  );
};
