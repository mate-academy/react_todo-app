import React, { useEffect, useState } from 'react';
import { Header } from './Components/Header';
import { Todo } from './Types/Todo';
import { TodoList } from './Components/TodoList';

// function useLocalStorage<T>(key: string, startValue: T): [T, (v: T) => void] {
//   const [value, setValue] = useState<T>(() => {
//     const data = localStorage.getItem(key);
//
//     if (data === null) {
//       return startValue;
//     }
//
//     try {
//       return JSON.parse(data);
//     } catch (e) {
//       return startValue;
//     }
//   });
//
//   const save = (newValue: T) => {
//     localStorage.setItem(key, JSON.stringify(newValue));
//     setValue(newValue);
//   };
//
//   return [value, save];
// }

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addPost = ({ ...data }: { title: string; status: boolean }) => {
    setTodos((currentTodo: Todo[]) => {
      const newTodo = {
        id: +new Date(),
        title: data.title,
        status: data.status,
      };

      return [newTodo, ...currentTodo];
    });
  };

  const updateTodoStatus = (id: number, newStatus: boolean) => {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === id ? { ...todo, status: newStatus } : todo,
      ),
    );
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <Header onSubmit={addPost} />

      <div className="todoapp__content">
        <section className="todoapp__main" data-cy="TodoList">
          <TodoList todos={todos} updateTodoStatus={updateTodoStatus} />
        </section>

        {/* Hide the footer if there are no todos */}
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            3 items left
          </span>

          {/* Active link should have the 'selected' class */}
          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className="filter__link selected"
              data-cy="FilterLinkAll"
            >
              All
            </a>

            <a
              href="#/active"
              className="filter__link"
              data-cy="FilterLinkActive"
            >
              Active
            </a>

            <a
              href="#/completed"
              className="filter__link"
              data-cy="FilterLinkCompleted"
            >
              Completed
            </a>
          </nav>

          {/* this button should be disabled if there are no completed todos */}
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
          >
            Clear completed
          </button>
        </footer>
      </div>
    </div>
  );
};
