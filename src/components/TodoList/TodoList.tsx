import React from 'react';

import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  filteredTodos: Todo[];
  setTodos: (arrOfTodos: Todo[]) => void;
};

export const TodoList: React.FC<Props> = ({ filteredTodos, setTodos }) => {
  const deleteTodo = (id: number) => {
    setTodos(filteredTodos.filter(todo => todo.id !== id));
  };

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>,
    id: number) => {
    const { checked } = event.target;

    const newTodos = filteredTodos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: checked,
        };
      }

      return todo;
    });

    setTodos(newTodos);
  };

  const editingTitle = (id: number, title: string) => {
    const newTodos = filteredTodos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          title,
        };
      }

      return todo;
    });

    setTodos(newTodos);
  };

  return (
    <ul className="todo-list" data-cy="todoList">
      {filteredTodos.map(todo => (
        <TodoItem
          todo={todo}
          deleteTodo={deleteTodo}
          handleToggle={handleToggle}
          editingTitle={editingTitle}
          key={todo.id}
        />
      ))}
    </ul>
  );
};
