/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  addTodoToServer, getTodos, removeTodo, updateTodo,
} from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/todoList';
import { TodoForm } from './components/todoForm';
import { TodoFooter } from './components/todoFooter';
import { Notification } from './components/notification';
import { FilterBy } from './types/FilterBy';
import { RegisterUser } from './components/registerUser';

const getFilteredTodos = (
  todos: Todo[],
  filterBy: FilterBy,
) => {
  switch (filterBy) {
    case FilterBy.ACTIVE:
      return todos.filter(todo => !todo.completed);

    case FilterBy.COMPLETED:
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.ALL);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [title, setTitle] = useState<string | undefined>('');
  const [disableForm, setDisableForm] = useState(false);
  const [idProcessed, setIdProcessed] = useState<number[]>([0]);
  const [disableList, setDisableList] = useState(false);
  const visibleTodos = getFilteredTodos(todos, filterBy);
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('user');

    return userData ? JSON.parse(userData) : null;
  });

  const USER_ID = user ? user.id : null;

  const getTodosFromServer = () => {
    if (USER_ID) {
      getTodos(USER_ID)
        .then((fetchedTodos: Todo[]) => {
          setTodos(fetchedTodos);
          setIdProcessed([0]);
        })
        .catch((fetchedError) => {
          setError(
            fetchedError?.message
              ? fetchedError.message
              : 'Something went wrong',
          );
        });
    }
  };

  useEffect(getTodosFromServer, [USER_ID]);

  const onAddTodo = () => {
    if (title) {
      setTempTodo({
        id: 0,
        userId: USER_ID,
        title,
        completed: false,
      });

      setDisableForm(true);

      addTodoToServer(USER_ID, {
        userId: USER_ID,
        title,
        completed: false,
      })
        .then((fetchedTodo: Todo) => {
          setTodos([...todos, fetchedTodo]);
          setTempTodo(null);
          setDisableForm(false);
          setTitle('');
        })
        .catch(() => {
          setTempTodo(null);
          setDisableForm(false);
          setError('Unable to add a todo');
        });
    }
  };

  const onDelete = (todoId: number) => {
    if (todoId) {
      setDisableList(true);

      removeTodo(`${todoId}`)
        .then(() => {
          getTodosFromServer();
          setDisableList(false);
        })
        .catch(() => {
          setError('Unable to delete a todo');
          setDisableList(false);
        });
    }
  };

  const onUpdate = (
    todoId: number,
    todoTitle: string,
    todoCompleted: boolean,
  ) => {
    if (todoId) {
      setDisableList(true);

      updateTodo(`${todoId}`, { completed: todoCompleted, title: todoTitle })
        .then(() => {
          getTodosFromServer();
          setDisableList(false);
        })
        .catch(() => {
          setError('Unable to update a todo');
          setDisableList(false);
          setIdProcessed([0]);
        });
    }
  };

  const completedTodos = useMemo(() => todos.filter(todo => todo.completed),
    [todos]);

  const handleClearCompleted = useCallback(async () => {
    const ids = completedTodos.map(todo => todo.id);

    setIdProcessed(ids);

    completedTodos.forEach(todo => {
      if (todo.id) {
        onDelete(todo.id);
      }
    });
  }, [completedTodos]);

  const notCompletedTodos = useMemo(() => todos.filter(todo => !todo.completed),
    [todos]);

  const handleAllToggle = useCallback(async () => {
    let ids;

    if (notCompletedTodos.length) {
      ids = notCompletedTodos.map(todo => todo.id);

      setIdProcessed(ids);

      notCompletedTodos.forEach(todo => onUpdate(
        todo.id, todo.title, !todo.completed,
      ));

      return;
    }

    ids = todos.map(todo => todo.id);

    setIdProcessed(ids);

    todos.forEach(todo => onUpdate(
      todo.id, todo.title, !todo.completed,
    ));
  }, [notCompletedTodos]);

  if (!USER_ID) {
    return <RegisterUser setUser={setUser} />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoForm
          setTitle={setTitle}
          title={title}
          onAdd={onAddTodo}
          disableForm={disableForm}
          handleToggleAll={handleAllToggle}
        />

        {todos.length ? (
          <>
            <TodoList
              todos={filterBy !== FilterBy.ALL ? visibleTodos : todos}
              tempTodo={tempTodo}
              idProcessed={idProcessed}
              disableList={disableList}
              onDelete={onDelete}
              onUpdate={onUpdate}
              setIdProcessed={setIdProcessed}
            />
            <TodoFooter
              setFilterBy={setFilterBy}
              itemsQuantity={filterBy !== FilterBy.ALL
                ? visibleTodos.length
                : todos.length}
              filterBy={filterBy}
              onClear={handleClearCompleted}
              completedLength={completedTodos.length}
            />
          </>
        ) : null}
      </div>

      <Notification
        onClose={(value: string | null) => setError(value)}
        error={error}
      />
    </div>
  );
};
