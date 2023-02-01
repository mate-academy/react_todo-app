import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { useTodos } from '../../utils/useTodos';
import { AuthContext } from '../Auth/AuthContext';

import { Header } from '../Header';
import { TodoList } from '../TodoList';
import { Footer } from '../Footer';
import { ErrorNotification } from '../ErrorNotification';

export const TodoApp: React.FC = React.memo(
  () => {
    const user = useContext(AuthContext);
    const [appliedNewTodoTitle, setAppliedNewTodoTitle] = useState('');
    const { status } = useParams();

    const {
      error,
      setError,
      todosFromServer,
      newTodoTitle,
      setNewTodoTitle,
      isAdding,
      loadTodos,
      createTodo,
      toggleAllTodos,
      clearCompletedTodos,
      removeTodo,
      toggleTodo,
      updateTodoTitle,
      todoIdsForLoader,
    } = useTodos();

    useEffect(() => {
      loadTodos();
    }, [user]);

    const todos = useMemo(() => (
      todosFromServer.filter(todo => {
        switch (status) {
          case 'completed':
            return todo.completed;

          case 'active':
            return !todo.completed;
          default:
            return todo;
        }
      })
    ), [todosFromServer, status]);

    const activeTodosCount = todosFromServer.reduce(
      (acc, todo) => (!todo.completed ? 1 : 0) + acc, 0,
    );

    return (
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <Header
            todosFromServer={todosFromServer}
            newTodoTitle={newTodoTitle}
            setNewTodoTitle={setNewTodoTitle}
            createTodo={createTodo}
            toggleAllTodos={toggleAllTodos}
            setAppliedNewTodoTitle={setAppliedNewTodoTitle}
            activeTodosCount={activeTodosCount}
            isAdding={isAdding}
          />

          <TodoList
            todos={todos}
            isAdding={isAdding}
            newTodoTitle={appliedNewTodoTitle}
            removeTodo={removeTodo}
            toggleTodo={toggleTodo}
            updateTodoTitle={updateTodoTitle}
            todoIdsForLoader={todoIdsForLoader}
          />

          <Footer
            todosFromServer={todosFromServer}
            activeTodosCount={activeTodosCount}
            clearCompletedTodos={clearCompletedTodos}
          />
        </div>

        <ErrorNotification
          error={error}
          setError={setError}
        />
      </div>
    );
  },
);
