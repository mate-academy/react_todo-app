/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import {
  createTodo, getTodo, getTodos, refreshTodo, removeTodo,
} from './api/todos';
import { TodoError } from './components/TodoError';
import { Status, ToDoFooter } from './components/TodoFooter';
import { Header } from './components/TodoHeader';
import { TodoMain } from './components/TodoMain';
import { ErrorMessage } from './types/ErrorMessage';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';

const USER_ID = 7096;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [todosStatus, setTodosStatus] = useState<Status>(Status.All);
  const [updatingTodos, setUpdatingTodos] = useState<number[]>([]);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setIsError(true);
        setErrorMsg(ErrorMessage.onLoad);

        setTimeout(() => {
          setIsError(false);
        }, 3000);
      });
  }, []);

  useEffect(() => {
    if (todo) {
      getTodo(todo.id)
        .then(setTodo);
    }
  }, [todo]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const addTodo = (todoData: Omit<Todo, 'id'>) => {
    if (todoData.title) {
      createTodo(todoData)
        .then(newTodo => setTodos([...todos, newTodo]))
        .catch(() => setErrorMsg(ErrorMessage.OnAdd));
    } else {
      setIsError(true);
      setErrorMsg(ErrorMessage.onEmpty);
      setTimeout(() => {
        setIsError(false);
        setErrorMsg('');
      }, 3000);
    }
  };

  const deleteTodo = (todoId: number) => {
    removeTodo(todoId)
      .then(() => {
        setTodos(oldTodos => oldTodos
          .filter(todoToDelete => todoToDelete.id !== todoId));
      })
      .catch(() => setErrorMsg(ErrorMessage.onDelete));
  };

  const updateTodo = (todoToUpdate: Todo) => {
    return new Promise<void>((resolve, reject) => {
      setUpdatingTodos(curr => [...curr, todoToUpdate.id]);

      refreshTodo(todoToUpdate)
        .then(() => {
          setTodos(todos => todos.map(currentTodo => {
            if (currentTodo.id === todoToUpdate.id) {
              return todoToUpdate;
            }

            return currentTodo;
          }));
          resolve();
        })
        .catch(error => {
          setErrorMsg(ErrorMessage.onUpdate);
          reject(error);
        })
        .finally(() => {
          setUpdatingTodos(curr => curr.filter(id => id !== todoToUpdate.id));
        });
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo({
      title: newTodoTitle,
      completed: false,
      userId: USER_ID,
    });

    setNewTodoTitle('');
  };

  let visibleTodos = todos;

  switch (todosStatus) {
    case Status.Active:
      visibleTodos = todos.filter(todo => !todo.completed);
      break;

    case Status.Completed:
      visibleTodos = todos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  const clearCompleted = async () => {
    visibleTodos
      .filter(td => td.completed)
      .map(completed => completed.id)
      .forEach(id => deleteTodo(id));
    setTodos(oldTodos => oldTodos.filter(t => !t.completed));
  };

  const hasAllTodosCompleted = todos.every(todo => todo.completed);

  const toggleCompleteAllTodos = () => {
    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !hasAllTodosCompleted,
    }));

    Promise.all(updatedTodos.map(updateTodo))
      .then(() => {
        setTodos(updatedTodos);
      })
      .catch(() => setErrorMsg(ErrorMessage.onUpdate));
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          onSubmit={handleSubmit}
          newTodoTitle={newTodoTitle}
          setNewTodoTitle={setNewTodoTitle}
          hasUncompletedTodo={!hasAllTodosCompleted}
          toggleCompleteAllTodos={toggleCompleteAllTodos}
        />

        <TodoMain
          todos={visibleTodos}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
          updatingTodos={updatingTodos}
        />
        {todos.length > 0 && (
          <ToDoFooter
            onClearCompleted={clearCompleted}
            todos={todos}
            todosStatus={todosStatus}
            setTodosStatus={setTodosStatus}
          />
        )}
      </div>

      {isError && (
        <TodoError
          error={isError}
          errorMsg={errorMsg}
          setError={setIsError}
        />
      )}
    </div>
  );
};
