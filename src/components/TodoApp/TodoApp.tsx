import { useCallback, useContext, useState } from 'react';
import { TodoContext } from '../../context/TodoContext';

import { NewTodo } from '../NewTodo';
import { TodoList } from '../TodoList';
import { TodoFooter } from '../TodoFooter';

import { Filter } from '../../types/Filter';

export const TodoApp = () => {
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const { todos, setTodos: setTodo } = useContext(TodoContext);

  const todosAllCompleted = todos.filter(todo => !todo.completed).length === 0;

  const addNewTodo = useCallback((title: string) => {
    const id = +new Date();
    const newTodo = {
      id,
      title,
      completed: false,
    };

    setTodo([...todos, newTodo]);
  }, [todos]);

  const toggleAllTodos = () => {
    const toggledTodos = todos.map(todo => {
      return {
        ...todo,
        completed: !todosAllCompleted,
      };
    });

    setTodo(toggledTodos);
  };

  const applyFilter = (filterValue: Filter) => {
    setFilter(filterValue);
  };

  const clearCompleted = () => {
    const todosNotCompleted = todos.filter(todo => !todo.completed);

    setTodo(todosNotCompleted);
  };

  const todosToRender = todos.filter(todo => {
    switch (filter) {
      case Filter.Active:
        return !todo.completed;
      case Filter.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTodo
          onAddTodo={addNewTodo}
        />
      </header>
      {todos.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={todosAllCompleted}
              onChange={toggleAllTodos}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <TodoList items={todosToRender} />
          </section>

          <TodoFooter
            onFilterChange={applyFilter}
            onClearCompleted={clearCompleted}
            filter={filter}
          />
        </>
      )}
    </div>
  );
};
