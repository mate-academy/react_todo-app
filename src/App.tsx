import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Error } from './components/Error';

import { Todo } from './types/Todo';
import { PatchTodo } from './types/PatchTodo';
import { ErrorMessage } from './enums/ErrorMessages';
import { Filter } from './enums/Filter';

import {
  USER_ID, deleteTodo, getTodos, patchTodos, postTodos,
} from './api/todos';

export const App: React.FC = () => {
  const url = useLocation().pathname.replace('/', '');
  const storedTodos = localStorage.getItem('todos');
  const initialTodos = storedTodos ? JSON.parse(storedTodos) : [];
  const [todoList, setTodoList] = useState<Todo[]>(initialTodos);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [loadingTodo, setLoadingTodo] = useState([0]);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [error, setError] = useState(ErrorMessage.NONE);
  const [filterValue, setFilterValue] = useState(url || Filter.All);

  useEffect(() => {
    if (todoList.length) {
      return;
    }

    const fetchData = async () => {
      try {
        const todos = await getTodos(USER_ID);

        setTodoList(todos);
      } catch (err) {
        setError(ErrorMessage.LOAD);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList));
  }, [todoList]);

  const addNewTodo = async (title: string) => {
    try {
      const todo = {
        title,
        userId: USER_ID,
        completed: false,
      };

      const newTodo = await postTodos(todo);

      setTempTodo({
        id: 0,
        ...todo,
      });

      setTodoList(current => [...current, newTodo]);
      setIsInputDisabled(true);
    } catch (err) {
      setError(ErrorMessage.ADD);
    } finally {
      setTempTodo(null);
      setIsInputDisabled(false);
    }
  };

  const changeTodo = async (id: number, data: PatchTodo) => {
    try {
      setLoadingTodo(prev => [...prev, id]);
      const newData = await patchTodos(id, data);

      setTodoList(current => (
        current.map(todo => {
          if (todo.id === id) {
            return { ...todo, ...newData };
          }

          return todo;
        })
      ));
    } catch (err) {
      setError(ErrorMessage.UPDATE);
    } finally {
      setLoadingTodo([0]);
    }
  };

  const removeTodo = async (id: number) => {
    try {
      setLoadingTodo(prev => [...prev, id]);
      await deleteTodo(id);

      setTodoList(current => (
        current.filter(todo => todo.id !== id)
      ));
    } catch (err) {
      setError(ErrorMessage.DELETE);
    } finally {
      setLoadingTodo([0]);
      setTempTodo(null);
    }
  };

  const toggleAll = (checked: boolean) => (
    todoList.forEach(async ({ id, completed }) => {
      if (checked) {
        await changeTodo(id, { completed: false });
      }

      if (!checked && !completed) {
        await changeTodo(id, { completed: true });
      }
    })
  );

  const selectAll = () => {
    setFilterValue(Filter.All);
  };

  const selectCompleted = () => {
    setFilterValue(Filter.Completed);
  };

  const selectActive = () => {
    setFilterValue(Filter.Active);
  };

  const clearCompleted = () => {
    todoList.forEach(async ({ completed, id }) => {
      if (completed) {
        await removeTodo(id);
      }
    });
  };

  const filteredTodos = useMemo(() => {
    return todoList.filter(todo => {
      switch (filterValue) {
        case Filter.Active:
          return !todo.completed;
        case Filter.Completed:
          return todo.completed;
        default:
          return todo;
      }
    });
  }, [todoList, filterValue]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <main>
        <Header
          todos={filteredTodos}
          onAdd={addNewTodo}
          onAddError={setError}
          toggleAll={toggleAll}
          onTempTodo={setTempTodo}
          isInputDisabled={isInputDisabled}
        />

        <div className="todoapp__content">
          <TodoList
            todos={filteredTodos}
            changeTodo={changeTodo}
            removeTodo={removeTodo}
            tempTodo={tempTodo}
            loadingTodo={loadingTodo}
          />

          <Footer
            todos={filteredTodos}
            filterValue={filterValue}
            onActive={selectActive}
            onAll={selectAll}
            onCompleted={selectCompleted}
            clearCompleted={clearCompleted}
          />
        </div>
      </main>

      {error && (
        <Error
          error={error}
          closeError={() => setError(ErrorMessage.NONE)}
        />
      )}
    </div>
  );
};
