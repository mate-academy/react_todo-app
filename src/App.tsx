import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import {
  createTodo, getTodos, deleteTodo, updateTodo,
} from './api/todos';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { ErrorMessages } from './components/ErrorMessages/ErrorMessages';
import { ErrorTypes } from './types/ErrorTypes';
import { getVisibleTodos } from './utils/getVisibleTodos';

const USER_ID = 10548;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [disableInput, setDisableInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorTypes | null>(null);
  const [idTodoForChange, setIdTodoForChange] = useState<number[]>([]);
  const location = useLocation();

  const visibleTodos = getVisibleTodos(location.pathname, todos);

  const itemsLeftCount = todos.filter(todo => !todo.completed).length;

  const isAnyTodoCompleted = todos.some(todo => todo.completed === true);

  const haveNotTodos = todos.length === 0;

  async function loadedTodos() {
    try {
      const result = await getTodos(USER_ID);

      setTodos(result);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(ErrorTypes.ErrorGet);
    }
  }

  const handleAddTodo = async (
    event: React.FormEvent<HTMLFormElement>,
    input: string,
    setInput: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    event.preventDefault();
    if (input.trim()) {
      setDisableInput(true);
      const todoTempo = {
        id: 0,
        userId: USER_ID,
        title: input,
        completed: false,
      };

      todos.splice(todos.length, 1, todoTempo);

      setIdTodoForChange((prev) => [...prev, todoTempo.id]);

      setInput('');
      try {
        const createdTodo = await createTodo(USER_ID, {
          title: input,
          userId: USER_ID,
          completed: false,
        });

        todos.splice(todos.length - 1, 1);
        await setTodos(prev => [...prev, createdTodo]);
        setDisableInput(false);
        setIdTodoForChange([]);
        setErrorMessage(null);
      } catch (error) {
        setErrorMessage(ErrorTypes.ErrorPost);
        setDisableInput(false);
      }
    }
  };

  const handleUpdateTodo = async (todo: Todo) => {
    setIdTodoForChange((prev) => [...prev, todo.id]);
    try {
      await updateTodo(todo.id, {
        title: todo.title,
        completed: todo.completed,
      });
      setErrorMessage(null);
      setIdTodoForChange([]);
    } catch (error) {
      setErrorMessage(ErrorTypes.ErrorPatch);
    }
  };

  const handleRemoveTodo = async (todo: Todo) => {
    setIdTodoForChange((prev) => [...prev, todo.id]);

    try {
      await deleteTodo(todo.id);
      setTodos(prev => prev.filter(({ id }) => id !== todo.id));
      setErrorMessage(null);
      setIdTodoForChange([]);
    } catch (error) {
      setErrorMessage(ErrorTypes.ErrorDelete);
    }
  };

  const handleChangeStatusTodo = async (
    todoId: number,
  ) => {
    let newTodo: Todo | null = null;

    await setTodos(todos.map((todo) => {
      if (todo.id !== todoId) {
        return todo;
      }

      newTodo = { ...todo, completed: !todo.completed };

      return newTodo;
    }));

    if (newTodo) {
      handleUpdateTodo(newTodo);
    }
  };

  const handleChangeStatusAllTodo = async () => {
    try {
      const todosStatus = await Promise.all(todos.map(
        ({ id }) => {
          setIdTodoForChange((prev) => [...prev, id]);

          return updateTodo(id, {
            completed: !todos.every(todo => todo.completed),
          });
        },
      ));

      setTodos(todosStatus);
      setIdTodoForChange([]);
    } catch {
      setErrorMessage(ErrorTypes.ErrorPatch);
    }
  };

  const handleDeleteCompletedTodo = async () => {
    try {
      const comletedTodos = todos.filter(todo => todo.completed);

      await Promise.all(comletedTodos.map(async todo => {
        setIdTodoForChange((prev) => [...prev, todo.id]);

        await deleteTodo(todo.id);
      }));

      setTodos(prev => prev.filter(todo => todo.completed === false));
      setIdTodoForChange([]);
    } catch (error) {
      setErrorMessage(ErrorTypes.ErrorDelete);
    }
  };

  const handleEditTodo = (
    todoEdited: Todo,
  ) => {
    setTodos(visibleTodos.map((todo) => {
      if (todo.id !== todoEdited.id) {
        return todo;
      }

      handleUpdateTodo({ ...todo, title: todoEdited.title });

      return { ...todo, title: todoEdited.title };
    }));
  };

  const handleDeleteErrorMessage = () => {
    setErrorMessage(null);
  };

  useEffect(() => {
    loadedTodos();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          countActiveTodo={itemsLeftCount}
          onHandleAddTodo={handleAddTodo}
          disabled={disableInput}
          onChangeStatusAllTodo={handleChangeStatusAllTodo}
          haveNotTodos={haveNotTodos}
        />

        <Main
          visibleTodos={visibleTodos}
          onRemoveTodo={handleRemoveTodo}
          onChangeStatusTodo={handleChangeStatusTodo}
          idTodoForChange={idTodoForChange}
          setIdTodoForChange={setIdTodoForChange}
          onEditTodo={handleEditTodo}
        />

        {!!todos.length && (
          <Footer
            itemsLeftCount={itemsLeftCount}
            onDeleteCompletedTodo={handleDeleteCompletedTodo}
            isAnyTodoCompleted={isAnyTodoCompleted}
          />
        )}

        {errorMessage
          && (
            <ErrorMessages
              errorMessage={errorMessage}
              onDeleteError={handleDeleteErrorMessage}
            />
          )}
      </div>
    </div>
  );
};
