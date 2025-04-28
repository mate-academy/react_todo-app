/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useTodos } from '../context/TodoContext';
import { Todo } from '../type/Todo';
import { TodoItem } from './TodoItem';

type TodoListProps = {
  filteredTodos: Todo[];
};

export const TododList: React.FC<TodoListProps> = ({ filteredTodos }) => {
  const { todos, setTodos } = useTodos();
  const [editingId, setEditingId] = useState<number>(0);

  const deleteTodo = (todoId: number) => {
    setTodos(() => todos.filter(todo => todoId !== todo.id));
  };

  const changeCheckbox = (todoToUpdate: Todo) => {
    setTodos((currentTodos: Todo[]) => {
      return currentTodos.map(todo =>
        todo.id === todoToUpdate.id ? todoToUpdate : todo,
      );
    });
  };

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setEditingId(0);
      }
    };

    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
          editingId={editingId}
          setEditingId={setEditingId}
          changeCheckbox={changeCheckbox}
          deleteTodo={deleteTodo}
        />
      ))}
    </section>
  );
};
