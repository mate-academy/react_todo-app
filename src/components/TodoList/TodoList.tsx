import React from 'react';

import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  filteredTodos: Todo[];
  setTodos: (arrOfTodos: (prevTodos: Todo[]) => Todo[]) => void;
};

export const TodoList: React.FC<Props> = ({ filteredTodos, setTodos }) => {
  const deleteTodo = (id: number) => {
    setTodos((prevState: Todo[]) => {
      return prevState.filter(todo => todo.id !== id);
    });
  };

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>,
    id: number) => {
    setTodos((prevState: Todo[]) => {
      return prevState.map(todo => {
        const { checked } = event.target;

        if (todo.id === id) {
          return {
            ...todo,
            completed: checked,
          };
        }

        return todo;
      });
    });
  };

  const editingTitle = (id: number, title: string) => {
    setTodos((prevState: Todo[]) => {
      return prevState.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            title,
          };
        }

        return todo;
      });
    });
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
