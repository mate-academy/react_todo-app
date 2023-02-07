import React, { useState, useCallback, useMemo } from 'react';
import { FilterType } from '../types/FilterType';
import { Todo } from '../types/Todo';
import { TodosFilter } from './FilteredTodos';
import { TodoList } from './TodoList';

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(
    JSON.parse(localStorage.getItem('todos') || '[]'),
  );
  const [title, setTitle] = useState('');
  const [filterType, setFilterType] = useState(FilterType.All);

  const saveNewTodos = (newTodos: Todo[]) => {
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const activeTodos = todos.filter((todo) => !todo.completed).length;

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title) {
      const newTodo: Todo = {
        id: +new Date(),
        title: title.trim(),
        completed: false,
      };

      saveNewTodos([...todos, newTodo]);
      setTitle('');
    }
  };

  const filteredTodos = useMemo(() => {
    switch (filterType) {
      case FilterType.Completed:
        return todos.filter((todo) => todo.completed);

      case FilterType.Active:
        return todos.filter((todo) => !todo.completed);

      case FilterType.All:
      default:
        return [...todos];
    }
  }, [todos, filterType]);

  const handleCheckAll = useCallback(() => {
    saveNewTodos(
      todos.map((todo) => ({
        ...todo,
        completed: activeTodos !== 0,
      })),
    );
  }, [todos, activeTodos]);

  const onDeleteTodo = (id: number) => {
    const deleteTodo = todos.filter((item) => item.id !== id);

    saveNewTodos(deleteTodo);
  };

  const onCompleted = useCallback(
    (id: number) => {
      const newTodos = [...todos];
      const changeTodo = newTodos.find((newTodo) => newTodo.id === id);

      if (changeTodo) {
        changeTodo.completed = !changeTodo.completed;
      }

      saveNewTodos(newTodos);
    },
    [todos],
  );

  const deleteCompleted = useCallback(() => {
    saveNewTodos(todos.filter((todo) => !todo.completed));
  }, [todos]);

  const onRenameTodo = (id: number, newTitle: string) => {
    if (!newTitle.trim()) {
      onDeleteTodo(id);

      return;
    }

    const newTodos = todos.map((todo) => {
      return (
        todo.id === id
          ? { ...todo, title: newTitle.trim() }
          : todo
      );
    });

    saveNewTodos(newTodos);
  };

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
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </form>
      </header>

      {todos.length > 0 && (
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

          <TodoList
            todos={filteredTodos}
            onDeleteTodo={onDeleteTodo}
            onCompleted={onCompleted}
            onRenameTodo={onRenameTodo}
          />
        </section>
      )}

      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${activeTodos} item${activeTodos !== 1 ? 's' : ''} left`}
          </span>

          <TodosFilter filterType={filterType} setFilterType={setFilterType} />

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
      )}
    </div>
  );
};
