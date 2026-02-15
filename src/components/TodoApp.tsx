import React from 'react';
import { useTodos } from '../context/TodoContext';
import { TodoHeader } from '../components/TodoHeader';
import { TodoItem } from '../components/TodoItem';
import { TodoFilter } from '../components/TodoFilter';

export const TodoApp: React.FC = () => {
  const { todos, visibleTodos } = useTodos();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        {todos.length > 0 && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {visibleTodos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </section>

            <TodoFilter />
          </>
        )}
      </div>
    </div>
  );
};
