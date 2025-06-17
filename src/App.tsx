import React, { useState } from 'react';
import { prepareTodoList } from './utils/prepareTodoList';

import { FilterParams, Todo } from './types/types';

import { AppHeader } from './components/AppHeader';
import { TodoItem } from './components/TodoItem';
import { AppFooter } from './components/AppFooter';
import { useGlobalState } from './globalProvider';

export const App: React.FC = () => {
  const [filter, setFilter] = useState<FilterParams>(FilterParams.All);

  const todos = useGlobalState();

  const todoList = prepareTodoList(todos, filter);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <AppHeader />

        <section className="todoapp__main" data-cy="TodoList">
          {todoList.map((todo: Todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </section>

        {!!todos.length && <AppFooter filter={filter} setFilter={setFilter} />}
      </div>
    </div>
  );
};
