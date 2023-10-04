import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { TodoListContext } from '../context/TodoListContext';

export const TodoList: React.FC = React.memo(() => {
  const { visibleTodos } = useContext(TodoListContext);

  return (
    <section className="main">
      <ul className="todo-list" data-cy="todosList">
        {visibleTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
          />
        ))}
      </ul>
    </section>
  );
});
