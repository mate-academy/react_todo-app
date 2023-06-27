import React, { useEffect, useState } from 'react';
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
import { Status } from './types/Status';

const USER_ID = 10548;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<Status>(Status.default);
  const [disableInput, setDisableInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorTypes | null>(null);
  const [hasEditTodo, setHasEditTodo] = useState(false);
  const [todoForUpdate, setTodoForUpdate] = useState<Todo | null>(null);
  const [idTodoForChange, setIdTodoForChange] = useState<number[]>([]);
  const [titleBeforeEdit, setTitleBeforeEdit] = useState<string>('');

  const getVisibleTodos = (statusTodo: Status, todosArr: Todo[]) => {
    switch (statusTodo) {
      case Status.active:
        return todosArr.filter(todo => !todo.completed);
      case Status.completed:
        return todosArr.filter(todo => todo.completed);
      default:
        return todosArr;
    }
  };

  const visibleTodos = getVisibleTodos(status, todos);

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

  const handleStatus = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    setStatus(event.currentTarget.dataset.type as Status || Status.default);
  };

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
      setTodoForUpdate(null);
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

  const handleEscEnterKey = (
    event: React.KeyboardEvent<HTMLInputElement>,
    todo: Todo,
  ) => {
    const todoCopy = { ...todo };

    if (event.key === 'Escape') {
      setHasEditTodo(false);

      setTodos(todos.map(todoVisible => {
        if (todoVisible.id !== todoCopy.id) {
          return todoVisible;
        }

        return { ...todoVisible, title: titleBeforeEdit };
      }));
      setTitleBeforeEdit('');
    }

    if (event.key === 'Enter') {
      setTodos(visibleTodos);
      setTitleBeforeEdit('');
    }

    return visibleTodos;
  };

  const handleEditTodo = (
    event: React.ChangeEvent<HTMLInputElement>,
    todoId: number,
  ) => {
    const currentTodo = todos.find(t => t.id === todoId);

    if (currentTodo) {
      setTitleBeforeEdit(currentTodo.title);
    }

    setTodos(visibleTodos.map((todo) => {
      if (todo.id !== todoId) {
        return todo;
      }

      setTodoForUpdate({ ...todo, title: event.target.value });

      return { ...todo, title: event.target.value };
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
          onEditTodo={handleEditTodo}
          hasEditTodo={hasEditTodo}
          setHasEditTodo={setHasEditTodo}
          onUpdateTodo={handleUpdateTodo}
          onChangeStatusTodo={handleChangeStatusTodo}
          todoForUpdate={todoForUpdate}
          setTodoForUpdate={setTodoForUpdate}
          idTodoForCheange={idTodoForChange}
          handleEscEnterKey={handleEscEnterKey}
        />

        {!!todos.length && (
          <Footer
            selectedStatus={status}
            onHandleStatus={handleStatus}
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
