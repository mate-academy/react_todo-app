import {
  FC, useEffect, useState,
} from 'react';
import {
  addTodo, deleteTodo, getTodos, updateTodo,
} from '../../api/api';
import { Todo } from '../../type';
import { Footer } from '../Footer';
import { TodoList } from '../TodoList';

const useLocalStorage = () => {
  const todosFromLocal = localStorage.getItem('todos');

  try {
    return todosFromLocal ? JSON.parse(todosFromLocal) : [];
  } catch (error) {
    return [];
  }
};

export const TodoApp: FC = () => {
  const [targetValue, setTargetValue] = useState('');
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [useServer, setUseServer] = useState(true);

  async function load() {
    const todoFromServer = await getTodos();

    setVisibleTodos(todoFromServer);
  }

  useEffect(() => {
    if (useServer) {
      load();
    } else {
      setVisibleTodos(useLocalStorage);
    }
  }, [useServer]);

  useEffect(() => {
    if (useServer) {
      load();
    } else {
      setVisibleTodos(useLocalStorage);
    }
  }, []);

  const addNewTodo = (event: React.FormEvent) => {
    event.preventDefault();
    const newTodo: Todo = {
      title: targetValue,
      completed: false,
      userId: 888,
    };

    if (useServer) {
      addTodo(newTodo);
    }

    setVisibleTodos(prevTodo => [...prevTodo,
      { id: +new Date(), ...newTodo },
    ]);

    setTargetValue('');
  };

  const onDelete = (id: number | undefined) => {
    setVisibleTodos(state => {
      return state.filter(todoForChange => {
        if (useServer && id) {
          deleteTodo(id);
        }

        return todoForChange.id !== id;
      });
    });
  };

  const DeleteAll = () => {
    setVisibleTodos(prevTodo => {
      return prevTodo.filter(todo => {
        if (useServer && todo.completed && todo.id) {
          deleteTodo(todo.id);
        }

        return !todo.completed;
      });
    });
  };

  const CompletedAll = () => {
    setVisibleTodos(prevTodo => {
      if (prevTodo.every(todo => todo.completed)) {
        return prevTodo.map(todo => {
          if (useServer && todo.id) {
            updateTodo(todo.id, { completed: false });
          }

          return { ...todo, completed: false };
        });
      }

      return prevTodo.map(todo => {
        if (todo.completed) {
          return todo;
        }

        if (useServer && todo.id) {
          updateTodo(todo.id, { completed: true });
        }

        return { ...todo, completed: true };
      });
    });
  };

  const onCompletedChange = (id: number | undefined) => {
    setVisibleTodos(state => {
      return state.map(todoForChange => {
        if (todoForChange.id === id) {
          if (useServer && todoForChange.id) {
            updateTodo(
              todoForChange.id,
              { completed: !todoForChange.completed },
            );
          }

          return {
            ...todoForChange,
            completed: !todoForChange.completed,
          };
        }

        return todoForChange;
      });
    });
  };

  useEffect(() => {
    if (!useServer) {
      localStorage.setItem('todos', JSON.stringify(visibleTodos));
    }
  }, [visibleTodos]);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={(event) => addNewTodo(event)}
        >
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={targetValue}
            onChange={(event) => {
              setTargetValue(event.target.value);
            }}
          />
        </form>
      </header>
      <section className="main">
        <input
          type="checkbox"
          checked={
            visibleTodos.every(todo => todo.completed)
            && visibleTodos.length !== 0
          }
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onChange={() => CompletedAll()}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TodoList
          todoList={visibleTodos}
          onDelete={onDelete}
          onCompletedChange={onCompletedChange}
          setVisibleTodos={setVisibleTodos}
          useServer={useServer}
        />
      </section>
      <form className="main">
        <label>
          <input
            type="checkbox"
            checked={useServer}
            onChange={() => setUseServer(state => !state)}
          />
          Use Server
        </label>
      </form>

      {visibleTodos.length !== 0
        && (
          <Footer
            todos={visibleTodos}
            DeleteAll={DeleteAll}
          />
        )}
    </div>
  );
};
