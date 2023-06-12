import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { TodoList } from './component/TodoList/todoList';
import { Footer } from './component/Footer/footer';
import { Header } from './component/Header/header';
import { Todo } from './type/Todo';
import { GetFilter } from './type/GetFilter';
import { getTodosPost, deleteTodo, getTodos } from './api/todos';
import { client } from './utils/fetchClient';
import { NewTodo } from './type/NewTodo';
import { ErrorMessage } from './type/error';
import { ErrorModal } from './component/ErrorModal/errorModal';

const USER_ID = 10570;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [querySearch, setQuerySearch] = useState('');
  const [filterBy, setFilterBy] = useState<GetFilter>(GetFilter.ALL);

  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const hasSomeTodos = todos.length > 0;
  const activeTodos = todos.filter(todo => todo.completed === false);

  const filteredTodos = useMemo(() => {
    switch (filterBy) {
      case GetFilter.ACTIVE:
        return todos.filter(todo => todo.completed === false);
      case GetFilter.COMPLETED:
        return todos.filter(todo => todo.completed === true);
      default:
        return todos;
    }
  }, [filterBy, todos]);

  const getTodosServer = async () => {
    try {
      const arrayTodos = await getTodos(USER_ID);

      setTodos(arrayTodos);
    } catch {
      setErrorMessage(ErrorMessage.DownloadError);
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getTodosServer();
  }, []);

  const addTodo = async () => {
    const newTodo: NewTodo = {
      userId: USER_ID,
      completed: false,
      title: querySearch,
    };

    try {
      if (querySearch.trim()) {
        await getTodosPost(USER_ID, newTodo);
      }

      setTempTodo({
        id: 0,
        ...newTodo,
      });

      await getTodosServer();
    } catch {
      setErrorMessage(ErrorMessage.NotAdd);
    } finally {
      setTempTodo(null);
    }
  };

  const handleDeleteTodo = async (todoId: number) => {
    try {
      await deleteTodo(todoId);
      await getTodosServer();
    } catch {
      setErrorMessage(ErrorMessage.NotDelete);
    }
  };

  const deleteTodoCompleted = async () => {
    todos.filter(todo => todo.completed)
      .map(todo => handleDeleteTodo(todo.id));
  };

  const onUpdate = async (id: number) => {
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
      setErrorMessage(ErrorMessage.Issue);
    }
  };

  const updateTodo = (
    todoId: number,
    property: Partial<Todo>,
  ) => {
    return client.patch(`/todos/${todoId}`, property);
  };

  const updateTodoStatus = useCallback(
    async (
      id: number,
      property: Partial<Todo>,
    ) => {
      try {
        await updateTodo(id, property);
        getTodosServer();
      } catch {
        setErrorMessage(ErrorMessage.NotUpdate);
      }
    }, [],
  );

  const handleCloseError = () => {
    setErrorMessage('');
  };

  const isAllTodosCompleted = useMemo(() => (
    todos.every(todo => todo.completed)
  ), [todos]);

  const selectAllTodos = useCallback(async () => {
    try {
      await Promise.all(todos.map(todo => (
        onUpdate(todo.id))));

      setTodos(todos.map(todo => (
        { ...todo, completed: !isAllTodosCompleted }
      )));
    } catch {
      setErrorMessage(ErrorMessage.NotUpdate);
    }
  }, [todos]);

  return (

    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          querySearch={querySearch}
          setQuerySearch={setQuerySearch}
          handleAddTodo={addTodo}
          selectAllTodos={selectAllTodos}
          isAllTodosCompleted={isAllTodosCompleted}
          hasSomeTodos={hasSomeTodos}
        />

        <TodoList
          todos={filteredTodos}
          onDelete={handleDeleteTodo}
          tempTodo={tempTodo}
          onChange={updateTodoStatus}
        />
        {todos.length > 0 && (
          <Footer
            todosShow={filteredTodos}
            filterBy={filterBy}
            setFilterBy={setFilterBy}
            handleDeleteTodoCompleted={deleteTodoCompleted}
            activeTodos={activeTodos.length}
          />
        )}
      </div>

      {errorMessage && (
        <ErrorModal
          onClose={handleCloseError}
          error={errorMessage}
          setError={setErrorMessage}
        />
      )}
    </div>
  );
};
