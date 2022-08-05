import { FC, useEffect, useState } from 'react';
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
  const [todos] = useState(useLocalStorage);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [targetValue, setTargetValue] = useState('');

  const addNewTodo = (event: React.FormEvent) => {
    event.preventDefault();
    const newTodo: Todo = {
      id: +new Date(),
      title: targetValue,
      completed: false,
    };

    setVisibleTodos(prevTodo => [...prevTodo, newTodo]);
    setTargetValue('');
  };

  const onDelete = (id: number) => {
    setVisibleTodos(state => {
      return state.filter(todoForChange => todoForChange.id !== id);
    });
  };

  const DeleteAll = () => {
    setVisibleTodos(prevTodo => {
      return prevTodo.filter(todo => !todo.completed);
    });
  };

  const onCompletedChange = (id: number) => {
    setVisibleTodos(state => {
      return state.map(todoForChange => {
        if (todoForChange.id === id) {
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
    setVisibleTodos(todos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(visibleTodos));
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
          onChange={() => {
            setVisibleTodos(prevTodo => {
              if (prevTodo.every(todo => todo.completed)) {
                return prevTodo.map(todo => {
                  return { ...todo, completed: false };
                });
              }

              return prevTodo.map(todo => {
                return todo.completed
                  ? todo
                  : { ...todo, completed: true };
              });
            });
          }}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TodoList
          todoList={visibleTodos}
          onDelete={onDelete}
          onCompletedChange={onCompletedChange}
          setVisibleTodos={setVisibleTodos}
        />
      </section>

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
