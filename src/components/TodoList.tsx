/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Todo } from '../type/Todo';
import { TodoItem } from './TodoItem';
import { useTodos } from '../context/TodoContext';

type TodoListProps = {
  filteredTodos: Todo[];
};

export const TododList: React.FC<TodoListProps> = ({ filteredTodos }) => {
  const [editingId, setEditingId] = useState<number>(0);

  const { setTodos } = useTodos();

  const deleteTodo = (todoId: number) => {
    setTodos(prevTodos =>
      prevTodos.filter(currentTodo => todoId !== currentTodo.id),
    );
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => {
        const { id } = todo;

        return (
          <TodoItem
            todo={todo}
            key={id}
            editingId={editingId}
            setEditingId={setEditingId}
            // changeCheckbox={changeCheckbox}
            deleteTodo={deleteTodo}
          />
        );
      })}
    </section>
  );
};
