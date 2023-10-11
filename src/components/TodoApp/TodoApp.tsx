import React, {
  useState, useRef, useEffect, useContext, useCallback, useMemo,
} from 'react';
import { TodosContext } from '../TodosContext';
import { TodoList } from '../TodoList';
import { TodosFilter } from '../TodosFilter';
import { Status } from '../../types/Status';

export const TodoApp: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [title, setTitle] = useState('');
  const titleField = useRef<HTMLInputElement>(null);
  const [filter, setFilter] = useState(Status.All);

  const handlerFilterChange = useCallback((newFilter: Status) => {
    setFilter(newFilter);
  }, []);

  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, []);

  const handleAddSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim()) {
      setTodos((prevTodos) => [
        ...prevTodos,
        {
          id: +new Date(),
          title,
          completed: false,
        },
      ]);
      setTitle('');
    }
  };

  const handlerCompleteAll = useCallback(() => {
    if (todos.some(todo => !todo.completed)) {
      const updatedTodos = todos.map(todo => ({
        ...todo,
        completed: true,
      }));

      setTodos(updatedTodos);
    } else {
      const updatedTodos = todos.map((todo) => ({
        ...todo,
        completed: false,
      }));

      setTodos(updatedTodos);
    }
  }, [todos, setTodos]);

  const hendleClearCompleted = useCallback(() => {
    setTodos(prevTodos => prevTodos.filter(elem => !elem.completed));
  }, [setTodos]);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      if (filter === Status.All) {
        return true;
      }

      if (filter === Status.Active) {
        return !todo.completed;
      }

      return todo.completed;
    });
  }, [filter, todos]);

  const noCompleteTodos = todos.filter(element => !element.completed);
  const hasJustOneCompleted = todos.some(element => element.completed);
  const todosAllCompleted = todos.every(element => element.completed);

  return (
    <header className="header">
      <h1>todos</h1>

      <form
        method="POST"
        onSubmit={handleAddSubmit}
      >
        <input
          ref={titleField}
          type="text"
          data-cy="createTodo"
          className="new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </form>

      {!!todos.length && (
        <section className="main">
          <input
            checked={todosAllCompleted}
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onChange={handlerCompleteAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList todos={filteredTodos} />
        </section>
      )}

      {!!todos.length && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${noCompleteTodos.length} items left`}
          </span>

          <TodosFilter
            changeFilter={handlerFilterChange}
            filter={filter}
          />

          {hasJustOneCompleted && (
            <button
              type="button"
              className="clear-completed"
              onClick={hendleClearCompleted}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </header>
  );
};
