import { FC, useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { TodoItem } from './TodoItem';
import { TodoContext } from '../TodoContext';
import { FilterValues, filters } from '../constants';

export const TodoList: FC = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const { pathname } = useLocation();

  const isEveryCompleted = useMemo(() => (
    todos.every(todo => todo.completed)
  ), [todos]);

  const toggleAll = () => {
    if (isEveryCompleted) {
      setTodos(todos.map(todo => ({ ...todo, completed: false })));
    } else {
      setTodos(todos.map(todo => (
        todo.completed
          ? todo
          : { ...todo, completed: true }
      )));
    }
  };

  const visibleTodos = useMemo(() => (
    todos.filter(todo => {
      switch (pathname) {
        case filters[1].link:
          return !todo.completed;

        case filters[2].link:
          return todo.completed;

        default:
          return FilterValues.ALL;
      }
    })
  ), [todos, pathname]);

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={toggleAll}
        checked={isEveryCompleted}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">

        {visibleTodos.map(todo => (
          <TodoItem
            todo={todo}
            key={todo.id}
          />
        ))}
      </ul>
    </section>
  );
};
