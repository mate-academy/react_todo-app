/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useState, useEffect, useMemo, useCallback,
} from 'react';
import { UserWarning } from './component/UserWarning';
import { client } from './utils/fetchClient';
import { getTodos, getPostTodos, deleteTodos } from './api/todos';
import { Todo } from './types/Todo';
import { NewTodo } from './types/NewTodo';
import { TodoList } from './component/TodoList';
import { TodoHeader } from './component/TodoHeader';
import { TodoFooter } from './component/TodoFooter';
import { SortEnum } from './types/sort';

const USER_ID = 10589;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [select, setSelect] = useState('all');
  const [isError, setIsError] = useState('');
  const [querySearch, setQuerySearch] = useState('');
  const [processing, setProcessing] = useState<number[]>([]);

  const lengTodos = todos.filter(({ completed }) => !completed).length;

  const addTodoToProcesing = (id : number | null) => {
    if (!id) {
      setProcessing([]);
    } else {
      setProcessing(prev => [...prev, id]);
    }
  };

  const getTodosAll = async () => {
    try {
      const receivedTodos = await getTodos(USER_ID);

      setTodos(receivedTodos);
    } catch {
      setIsError('Failed to load todos');
      setTimeout(() => {
        setIsError('');
      }, 3000);
    } finally {
      addTodoToProcesing(null);
    }
  };

  const filteredTodos = useMemo(() => {
    switch (select) {
      case SortEnum.ACTIVE:
        return todos.filter(({ completed }) => !completed);

      case SortEnum.ALL:
        return todos;

      case SortEnum.COMPLETED:
        return todos.filter(({ completed }) => completed);

      default:
        return todos;
    }
  }, [todos, select]);

  useEffect(() => {
    getTodosAll();
  }, []);

  const addTodo = async () => {
    const newTodo: NewTodo = {
      userId: USER_ID,
      completed: false,
      title: querySearch,
    };

    try {
      await getPostTodos(USER_ID, newTodo);
      await getTodosAll();
    } catch {
      setIsError('Unable to add a todo');
      setTimeout(() => {
        setIsError('');
      }, 3000);
    } finally {
      addTodoToProcesing(null);
    }
  };

  const handleDeleteTodo = async (todoId: number) => {
    try {
      await deleteTodos(todoId);
      await getTodosAll();
      addTodoToProcesing(todoId);
    } catch {
      setIsError('Unable to delete a todo');
      setTimeout(() => {
        setIsError('');
      }, 3000);
    } finally {
      addTodoToProcesing(null);
    }
  };

  const handleDeleteTodoCompleted = async () => {
    todos.filter(todo => todo.completed)
      .map(todo => handleDeleteTodo(todo.id));
  };

  const handleUpdateStatus = async (id: number) => {
    const updatedTodo = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    setTodos(updatedTodo);
    try {
      const todoToUpdate = todos.find((todo) => todo.id === id);

      if (todoToUpdate) {
        await client.patch(`/todos/${id}`, {
          completed: !todoToUpdate.completed,
          title: todoToUpdate.title,
          userId: USER_ID,
          id,
        });
      }
    } catch {
      setIsError('Unable to override task status');
      setTimeout(() => {
        setIsError('');
      }, 3000);
    } finally {
      addTodoToProcesing(null);
    }
  };

  const handleUpdateAllTodoStatus = async () => {
    const someCompleted = todos.some(todo => !todo.completed);

    const updatedAllTodo = todos.map((todo) => {
      if (someCompleted) {
        return {
          ...todo,
          completed: true,
        };
      }

      return {
        ...todo,
        completed: !todo.completed,
      };
    });

    setTodos(updatedAllTodo);
    try {
      if (someCompleted) {
        todos.forEach(async ({
          title, id,
        }) => {
          await client.patch(`/todos/${id}`, {
            completed: true,
            title,
            userId: USER_ID,
            id,
          });
        });
      } else {
        todos.forEach(async ({
          title, id, completed,
        }) => {
          await client.patch(`/todos/${id}`, {
            completed: !completed,
            title,
            userId: USER_ID,
            id,
          });
        });
      }
    } catch {
      setIsError('Unable to override all tasks status');
      setTimeout(() => {
        setIsError('');
      }, 3000);
    } finally {
      addTodoToProcesing(null);
    }
  };

  const handleUpdateTitle = async (id: number, newTitle: string) => {
    const updatedTodo = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title: newTitle,
        };
      }

      return todo;
    });

    setTodos(updatedTodo);
    try {
      const todoToUpdate = todos.find((todo) => todo.id === id);

      if (todoToUpdate) {
        await client.patch(`/todos/${id}`, {
          title: newTitle,
          userId: USER_ID,
          id,
        });
        addTodoToProcesing(todoToUpdate.id);
      }
    } catch {
      setIsError('Unable to update a todo');
      setTimeout(() => {
        setIsError('');
      }, 3000);
    } finally {
      addTodoToProcesing(null);
    }
  };

  const handleCleanErrorMessage = useCallback(() => {
    setIsError('');
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader
          todos={todos}
          quarySearch={querySearch}
          setQuarySearch={setQuerySearch}
          addTodo={addTodo}
          handleUpdateAllTodoStatus={handleUpdateAllTodoStatus}
        />
        {filteredTodos.map(todo => (
          <TodoList
            key={todo.id}
            todo={todo}
            todos={filteredTodos}
            handleDeleteTodo={handleDeleteTodo}
            handleUpdateStatus={handleUpdateStatus}
            handleUpdateTitle={handleUpdateTitle}
            processing={processing}
          />
        ))}

        <TodoFooter
          select={select}
          setSelect={setSelect}
          todos={filteredTodos}
          lengTodos={lengTodos}
          handleDeleteTodoCompleted={handleDeleteTodoCompleted}
        />
      </div>
      {isError && (
        <div
          className="notification is-danger is-light has-text-weight-normal"
        >
          <button
            type="button"
            className="delete"
            onClick={handleCleanErrorMessage}
          />
          {isError}
        </div>
      )}

    </div>
  );
};
