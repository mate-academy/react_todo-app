import { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { TodosContext } from './TodosContext';
import classNames from 'classnames';
import { Filter } from '../types/filter';
import { Todo } from '../types/Todo';

export const TodoList = () => {
  const { todos, setTodos, filterType } = useContext(TodosContext);

  const handleClickToggleTodos = () => {
    let newTodos;

    if (todos.some(item => !item.completed)) {
      newTodos = todos.map(item => {
        if (!item.completed) {
          return {
            ...item,
            completed: true,
          };
        }

        return item;
      });
    } else {
      newTodos = todos.map(item => {
        return {
          ...item,
          completed: false,
        };
      });
    }

    setTodos(newTodos);
  };

  const filter = (type: Filter, todosToFilter: Todo[]) => {
    switch (type) {
      case Filter.ACTIVE:
        return todosToFilter.filter(el => !el.completed);

      case Filter.COMPLETED:
        return todosToFilter.filter(el => el.completed);

      default:
        return todosToFilter;
    }
  };

  const filterTodos = filter(filterType, todos);

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={todos.every(todo => todo.completed)}
        onChange={handleClickToggleTodos}
      />
      <label
        htmlFor="toggle-all"
        className={classNames({
          hidden: !todos.length,
        })}
      >
        Mark all as complete
      </label>

      <ul className="todo-list" data-cy="todosList">
        {filterTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  );
};
