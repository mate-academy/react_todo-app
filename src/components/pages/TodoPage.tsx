import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Todo } from '../../types/Todo';
import TodoList from '../TodoList';
import TodosFilter from '../TodosFilter';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import {
  deleteTodo, getTodos, patchTodo, postNewTodo,
} from '../../api/todos';

const TodoPage: FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState('');
  const [isSaveLocalStorage, setSaveLocalStorage] = useState(true);
  const [isSaveServer, setSaveServer] = useState(false);
  const location = useLocation();
  const filterBy = location.pathname;

  useEffect(() => {
    const retrieveTodos = async () => {
      const result = await getTodos();

      setLoading(false);
      setTodosFromServer(result.reverse());
    };

    retrieveTodos();
  }, [todosFromServer]);

  const updateCompleteTodoHandler = async (
    id: number | undefined,
    completed: boolean,
  ) => {
    if (isSaveLocalStorage) {
      setTodos((prevState: Todo[]) => {
        return prevState.map(todo => {
          if (todo.id === id) {
            return { ...todo, completed };
          }

          return todo;
        });
      });
    } else {
      await patchTodo(id, { completed });
    }
  };

  const updateTitleTodoHandler = async (
    id: number | undefined,
    title: string,
  ) => {
    if (isSaveLocalStorage) {
      setTodos(prevState => {
        return prevState.map(todo => {
          if (todo.id === id) {
            return { ...todo, title };
          }

          return todo;
        });
      });
    } else {
      await patchTodo(id, { title });
    }
  };

  const deleteTodoById = async (id: number | undefined) => {
    if (isSaveLocalStorage) {
      setTodos(prevState => {
        return prevState.filter(todo => {
          return todo.id !== id;
        });
      });
    } else {
      await deleteTodo(id);
    }
  };

  const mainTodos = isSaveLocalStorage ? todos : todosFromServer;

  const deleteAll = async () => {
    if (isSaveLocalStorage) {
      setTodos(prevState => {
        return prevState.filter(item => !item.completed);
      });
    } else {
      mainTodos.forEach(t => {
        deleteTodo(t.id);
      });
    }
  };

  const visibleTodos = mainTodos.filter(todo => {
    switch (filterBy) {
      case '/active': {
        return !todo.completed;
      }

      case '/': {
        return true;
      }

      case '/completed': {
        return todo.completed;
      }

      default:
        return true;
    }
  });

  const toggleAll = async () => {
    if (mainTodos.every(t => t.completed)) {
      if (isSaveLocalStorage) {
        setTodos(prevState => {
          return prevState.map(t => {
            const completed = t.completed ? false : !t.completed;

            return { ...t, completed };
          });
        });
      } else {
        mainTodos.forEach(t => {
          const completed = t.completed ? false : !t.completed;

          patchTodo(t.id, { completed });
        });
      }
    } else if (isSaveLocalStorage) {
      setTodos(prevState => {
        return prevState.map(t => {
          const completed = t.completed ? true : !t.completed;

          return { ...t, completed };
        });
      });
    } else {
      mainTodos.forEach(t => {
        const completed = t.completed ? true : !t.completed;

        patchTodo(t.id, { completed });
      });
    }
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={(e) => {
          e.preventDefault();
          const newTodo = {
            id: +new Date(),
            title: value,
            completed: false,
            userId: 4,
          };

          if (isSaveLocalStorage) {
            if (value.length > 0) {
              setTodos(prevState => [newTodo, ...prevState]);
              setValue('');
            }
          } else {
            const { id, ...ToDo } = newTodo;

            postNewTodo(ToDo);
            setValue('');
          }
        }}
        >
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </form>
        <form>
          <input
            type="checkbox"
            id="toggle-localStor"
            checked={isSaveLocalStorage}
            onChange={() => {
              setSaveServer(false);
              setSaveLocalStorage(true);
            }}
          />
          <label htmlFor="toggle-localStor">Save todos in localstorage</label>
          <input
            type="checkbox"
            id="toggle-server"
            checked={isSaveServer}
            onChange={() => {
              setSaveServer(true);
              setSaveLocalStorage(false);
            }}
          />
          <label htmlFor="toggle-server">Save todos on the server</label>
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          checked={mainTodos.every(t => t.completed)}
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onChange={() => {
            toggleAll();
          }}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        {!loading && (
          <TodoList
            todos={visibleTodos}
            onChangeComplete={updateCompleteTodoHandler}
            onClickDelete={deleteTodoById}
            onPressEnter={updateTitleTodoHandler}
          />
        )}
      </section>

      {mainTodos.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {mainTodos.filter(t => !t.completed).length}
            {' '}
            items left
          </span>

          <TodosFilter />

          {mainTodos.filter(t => t.completed).length >= 1 && (
            <button
              type="button"
              className="clear-completed"
              onClick={() => {
                deleteAll();
              }}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </div>
  );
};

export default TodoPage;
