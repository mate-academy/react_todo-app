import React, { useContext, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { TodoItem } from '../TodoItem';
import { TodosContext } from '../../utils/TodosContext';

export const TodoList = () => {
  const { pathname } = useLocation();
  const { todos, setTodos } = useContext(TodosContext);

  const onCompleteTodos = useCallback((event, id) => {
    const { checked } = event.target;
    const todosModified = todos.map((todo) => {
      if (todo.id !== id) {
        return todo;
      }

      return { ...todo, completed: checked };
    });

    setTodos(todosModified);
  }, [todos, setTodos]);

  const onRemoveTodo = useCallback((id) => {
    const todosModified = todos.filter(todo => todo.id !== id);

    setTodos(todosModified);
  }, [todos, setTodos]);

  const filteredTodo = useMemo(() => {
    switch (pathname) {
      case '/': {
        return todos;
      }

      case '/completed': {
        return todos.filter(todo => todo.completed);
      }

      case '/active': {
        return todos.filter(todo => !todo.completed);
      }

      default: {
        return todos;
      }
    }
  }, [todos, pathname]);

  const onTitleChange = (value, id) => {
    if (value) {
      const todosModified = todos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }

        return { ...todo, title: value };
      });

      setTodos(todosModified);
    }
  };

  if (!todos.length) {
    return null;
  }

  return (
    <ul className="todo-list">
      {filteredTodo.map(({ id, title, completed }) => (
        <TodoItem
          key={id}
          id={id}
          title={title}
          completed={completed}
          onCompletedTodos={onCompleteTodos}
          onRemoveTodo={onRemoveTodo}
          onTitleChange={onTitleChange}
        />
      ))}
    </ul>
  );
};
