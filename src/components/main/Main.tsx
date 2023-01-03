import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Todo } from '../../types/Todo';
import { TodoList } from '../TodoList';
import { ToggleAllButton } from '../ToggleAllButton';

type Props = {
  todos: Todo[];
  completedTodos: Todo[];
  activeTodos: Todo[];
  toggleAll: () => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  updateTodo: (newTitle: string, id: number) => void;
};

export const Main = React.memo<Props>(({
  todos,
  activeTodos,
  completedTodos,
  toggleAll,
  removeTodo,
  toggleTodo,
  updateTodo,
}) => {
  return (
    <section className="main">
      <ToggleAllButton
        todos={todos}
        completedTodos={completedTodos}
        toggleAll={toggleAll}
      />

      <Routes>
        <Route path="/">
          <Route
            index
            element={(
              <TodoList
                items={todos}
                removeTodo={removeTodo}
                toggleTodo={toggleTodo}
                updateTodo={updateTodo}
              />
            )}
          />

          <Route
            path="/completed"
            element={(
              <TodoList
                items={completedTodos}
                removeTodo={removeTodo}
                toggleTodo={toggleTodo}
                updateTodo={updateTodo}
              />
            )}
          />

          <Route
            path="/active"
            element={(
              <TodoList
                items={activeTodos}
                removeTodo={removeTodo}
                toggleTodo={toggleTodo}
                updateTodo={updateTodo}
              />
            )}
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </section>
  );
});
