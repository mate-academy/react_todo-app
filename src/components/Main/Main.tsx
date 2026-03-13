/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { TodoItem } from '../TodoItem';
import { TodoContext } from '../../context/TodoContext';

type Props = {
  filter: 'all' | 'active' | 'completed';
};

export const Main: React.FC<Props> = ({ filter }) => {
  const context = useContext(TodoContext);

  if (!context) {
    return null;
  }

  const { todos, deleteTodo, toggleTodo, editTodo } = context;

  const visibleTodos = todos.filter(t => {
    if (filter === 'active') {
      return !t.completed;
    }

    if (filter === 'completed') {
      return t.completed;
    }

    return true;
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <TodoItem
          todo={todo}
          onDelete={deleteTodo}
          onToggle={toggleTodo}
          onEdit={editTodo}
          key={todo.id}
        />
      ))}
    </section>
  );
};
