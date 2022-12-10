import React, {
  useContext, useEffect, useRef, useState, useMemo,
} from 'react';
import { useLocation } from 'react-router-dom';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { User } from './types/User';
import * as todoAPI from './api/todos';

import { AuthContext } from './components/Auth/AuthContext';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const user = useContext(AuthContext) as User;
  const newTodoField = useRef<HTMLInputElement>(null);
  const location = useLocation();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [addingTitle, setAddingTitle] = useState('');
  const [processingTodos, setProcessingTodos] = useState<number[]>([]);

  useEffect(() => {
    setErrorMessage('');

    todoAPI.getTodos(user.id)
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos for such user'));
  }, [user.id]);

  const activeTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed);
  }, [todos]);

  const completedTodos = useMemo(() => {
    return todos.filter(todo => todo.completed);
  }, [todos]);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (location.pathname.slice(1)) {
        case Status.Completed:
          return todo.completed;

        case Status.Active:
          return !todo.completed;

        case Status.All:
        default:
          return true;
      }
    });
  }, [todos, location]);

  const addProcessingTodo = (todoIdToAdd: number) => {
    setProcessingTodos(current => [...current, todoIdToAdd]);
  };

  const removeProcessingTodo = (todoIdToRemove: number) => {
    setProcessingTodos(current => current.filter(id => id !== todoIdToRemove));
  };

  const addTodo = (title: string) => {
    setIsAdding(true);
    setAddingTitle(title);
    setErrorMessage('');

    const newTodo = {
      id: +new Date(),
      title,
      userId: user.id,
      completed: false,
    };

    todoAPI.addTodo(newTodo)
      .then(createdTodo => {
        setTodos(current => [...current, createdTodo]);
      })
      .catch(() => setErrorMessage('Unable to add a todo'))
      .finally(() => {
        setIsAdding(false);
        setAddingTitle('');
      });
  };

  const deleteTodo = async (todoId: number) => {
    addProcessingTodo(todoId);
    setErrorMessage('');

    todoAPI.deleteTodo(todoId)
      .then(() => {
        setTodos(current => current.filter(todo => todo.id !== todoId));
      })
      .catch(() => setErrorMessage('Unable to delete a todo'))
      .finally(() => removeProcessingTodo(todoId));
  };

  const updateTodo = async (updatedTodo: Todo) => {
    addProcessingTodo(updatedTodo.id);
    setErrorMessage('');

    todoAPI.updateTodo(updatedTodo)
      .then(() => {
        setTodos(current => current.map(
          todo => (todo.id === updatedTodo.id
            ? updatedTodo
            : todo
          ),
        ));
      })
      .catch(() => {
        setErrorMessage('Unable to update a todo');
      })
      .finally(() => removeProcessingTodo(updatedTodo.id));
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <p className="todoapp__user">
        {`Welcome back: ${user.name}`}
      </p>

      <div className="todoapp__content">
        <Header
          newTodoField={newTodoField}
          todos={todos}
          activeTodos={activeTodos}
          completedTodos={completedTodos}
          isAdding={isAdding}
          onErrorMessage={setErrorMessage}
          handleAddTodo={addTodo}
          handleUpdateTodo={updateTodo}
        />

        <TodoList
          todos={visibleTodos}
          isAdding={isAdding}
          processingTodos={processingTodos}
          addingTitle={addingTitle}
          handleDeleteTodo={deleteTodo}
          handleUpdateTodo={updateTodo}
        />

        {(todos.length > 0 || isAdding) && (
          <Footer
            activeTodos={activeTodos}
            completedTodos={completedTodos}
            handleDeleteTodo={deleteTodo}
          />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        onErrorMessage={setErrorMessage}
      />
    </div>
  );
};
