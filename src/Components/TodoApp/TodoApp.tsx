import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Todo } from '../../Types/Todo';
import { useLocalStorage } from '../../Utilits/LocalStorage/LocalStorageAPI';
import {
  addTodoServer,
  deleteTodoServer,
  getTodos,
  updateTodoServer,
} from '../../Utilits/ServerStroage/ServerStorageAPI';
import { StorageContext } from '../../Utilits/StorageContext';
import { StorageSelector } from '../StorageSelector/StorageSelector';
import { TodoAdd } from '../TodoAdd/TodoAdd';
import { TodosFilters } from '../TodoFilters/TodosFilter';
import { TodoList } from '../TodoList/TodoList';

export const TodoApp: React.FC = () => {
  const [storage, setStorage] = useState('local');
  const { pathname } = useLocation();
  const [localTodos, setLocalTodos] = useLocalStorage<Todo[]>('todos', []);
  const [serverTodos, setServerTodos] = useState<Todo[]>([]);

  const updateServer = async () => {
    getTodos().then(setServerTodos);
  };

  useEffect(() => {
    const timer = setInterval(updateServer, 500);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    updateServer();
  },
  []);

  const usedTodos = storage === 'local' ? localTodos : serverTodos;

  const visibleTodos = [...usedTodos].filter(todo => {
    switch (pathname) {
      case '/active':
        return todo.completed === false;
      case '/completed':
        return todo.completed === true;

      default:
        return true;
    }
  });

  const addTodoLocal = (title: string) => {
    const newTodo = {
      userId: 1,
      title,
      id: localTodos.length > 0
        ? Math.max(...localTodos.map(todo => todo.id)) + 1
        : 1,
      completed: false,
    };

    setLocalTodos([newTodo, ...localTodos]);
  };

  const addTodo = (value: string) => {
    if (storage === 'local') {
      return addTodoLocal(value);
    }

    return addTodoServer(
      {
        userId: 1,
        title: value,
        completed: false,
      },
    );
  };

  const deleteTodoLocal = (value?: number) => {
    if (!value) {
      setLocalTodos(localTodos.filter(todo => todo.completed !== true));
    } else {
      setLocalTodos(localTodos.filter(todo => todo.id !== value));
    }
  };

  const deleteTodo = (value? : number) => {
    if (storage === 'local') {
      deleteTodoLocal(value);
    } else if (value) {
      deleteTodoServer(value);
    } else {
      usedTodos.filter(todo => todo.completed === true)
        .forEach(onDeleteTodo => deleteTodoServer(onDeleteTodo.id));
    }
  };

  const updateTodoLocal = (id: number, value: string | boolean) => {
    const changetTodo = localTodos.find(todo => todo.id === id);

    if (!changetTodo) {
      return;
    }

    if (typeof value === 'boolean') {
      changetTodo.completed = value;
    } else {
      changetTodo.title = value;
    }

    setLocalTodos(localTodos.map(todo => {
      if (todo.id === id) {
        return changetTodo;
      }

      return todo;
    }));
  };

  const updateTodo = (id: number, value: string | boolean) => {
    if (storage === 'local') {
      updateTodoLocal(id, value);
    } else {
      const updatedValue = typeof value === 'string'
        ? { title: value }
        : { completed: value };

      updateTodoServer(id, updatedValue);
    }
  };

  const localeMarkAllTodo = () => {
    if (localTodos.every(todo => todo.completed === true)) {
      localTodos.forEach(todo => updateTodoLocal(todo.id, false));
    } else {
      localTodos.forEach(todo => updateTodoLocal(todo.id, true));
    }
  };

  const MarkAll = () => {
    if (storage === 'local') {
      localeMarkAllTodo();
    } else if (usedTodos.every(todo => todo.completed === true)) {
      usedTodos
        .forEach(todo => updateTodoServer(todo.id, { completed: false }));
    } else {
      usedTodos.forEach(todo => updateTodoServer(todo.id, { completed: true }));
    }
  };

  return (
    <StorageContext.Provider value="">
      <StorageSelector storage={storage} setStorage={setStorage} />
      <div className="todoapp">
        <header className="header">
          <h1>{`${storage} todos`}</h1>
          <TodoAdd addTodo={addTodo} />
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onChange={() => {
              MarkAll();
            }}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            visibleTodos={visibleTodos}
            updateTodo={updateTodo}
            clear={deleteTodo}
          />
        </section>
        {usedTodos.length !== 0
        && (
          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {usedTodos.length}
            </span>
            <TodosFilters />
            <button
              type="button"
              className="clear-completed"
              onClick={() => {
                deleteTodo();
              }}
            >
              Clear completed
            </button>
          </footer>
        )}

      </div>
    </StorageContext.Provider>
  );
};
