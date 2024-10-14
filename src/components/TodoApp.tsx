import React, { useState } from 'react';
import { useGlobalState } from '../store/Store';
import { TodoItem } from './TodoItem';
import { Header } from './Header';
import { Footer } from './Footer';
import { TodoFilter } from '../enums/TodoFilter';

export const TodoApp: React.FC = () => {
  const [filter, setFilter] = useState<TodoFilter>(TodoFilter.All);
  const { todos } = useGlobalState();

  const filteredTodos = todos.filter(todo => {
    if (filter === TodoFilter.Active) {
      return !todo.completed;
    }

    if (filter === TodoFilter.Completed) {
      return todo.completed;
    }

    return true;
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        {!!todos.length && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {filteredTodos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </section>

            <Footer filter={filter} setFilter={setFilter} />
          </>
        )}
      </div>
    </div>
  );
};
