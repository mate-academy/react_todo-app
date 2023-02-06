import React, { useState, useCallback, useMemo } from 'react';
import { FilterType } from '../../types/FilterType';
import { Todo } from '../../types/Todo';
import { TodosFilter } from '../FilteredTodos/FilteredTodos';
import { TodoList } from '../TodoList/TodoList';

type Props = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};

export const TodoApp: React.FC<Props> = ({ todos, setTodos }) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [filterType, setFilterType] = useState(FilterType.All);

  const handleNewTodoTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewTodoTitle(event.target.value);
    },
    [newTodoTitle],
  );

  const activeTodos = useMemo(
    () => todos.reduce((act, curr) => act + (curr.completed ? 0 : 1), 0),
    [todos],
  );

  const onSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

      if (newTodoTitle) {
        const newTodo: Todo = {
          id: +new Date(),
          title: newTodoTitle,
          completed: false,
        };

        setTodos([...todos, newTodo]);
        setNewTodoTitle('');
      }
    }, [newTodoTitle],
  );

  const filteredTodos = useMemo(() => {
    switch (filterType) {
      case FilterType.Completed:
        return todos.filter((todo) => todo.completed === true);
      case FilterType.Active:
        return todos.filter((todo) => todo.completed === false);
      case FilterType.All:
      default:
        return [...todos];
    }
  }, [todos, filterType]);

  const handleCheckAll = useCallback(() => {
    setTodos(
      todos.map((todo) => ({
        ...todo,
        completed: activeTodos !== 0,
      })),
    );
  }, [todos, activeTodos]);

  const deleteCompleted = useCallback(() => {
    setTodos(todos.filter((todo) => !todo.completed));
  }, [todos]);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form action="" onSubmit={onSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodoTitle}
            onChange={handleNewTodoTitle}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          checked={activeTodos === 0}
          onChange={handleCheckAll}
        />

        <label htmlFor="toggle-all"> </label>

        <TodoList todos={filteredTodos} setTodos={setTodos} />
      </section>

      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {`${activeTodos} item${activeTodos !== 1 ? 's' : ''} left`}
        </span>

        <TodosFilter
          filterType={filterType}
          setFilterType={setFilterType}
        />

        {activeTodos < todos.length && (
          <button
            type="button"
            className="clear-completed"
            onClick={deleteCompleted}
          >
            Clear completed
          </button>
        )}
      </footer>
    </div>
  );
};
