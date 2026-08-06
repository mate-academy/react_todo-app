/* eslint-disable jsx-a11y/label-has-associated-control */
import { useFilter } from '../../hooks/useFilter';
import { useTodos } from '../../hooks/useTodos';
import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';
import { Todo as TodoItem } from '../Todo/';
import './TodoList.scss';

const getFilteredTodos = (todos: Todo[], filter: Filter) => {
  return todos.filter(todo => {
    switch (filter) {
      case 'all':
        return true;
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
    }
  });
};

export const TodoList = () => {
  const todos = useTodos();
  const filter = useFilter();

  const filteredTodos = getFilteredTodos(todos, filter);

  return (
    <section className="todo-list" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
        />
      ))}

      {/* This is a completed todo
      <div data-cy="Todo" className="todo completed">
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked
          />
        </label>

        <span data-cy="TodoTitle" className="todo__title">
          Completed Todo
        </span>

        Remove button appears only on hover
        <button type="button" className="todo__remove" data-cy="TodoDelete">
          ×
        </button>
      </div>

      This todo is an active todo
      <div data-cy="Todo" className="todo">
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
          />
        </label>

        <span data-cy="TodoTitle" className="todo__title">
          Not Completed Todo
        </span>

        <button type="button" className="todo__remove" data-cy="TodoDelete">
          ×
        </button>
      </div>

      This todo is being edited
      <div data-cy="Todo" className="todo">
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
          />
        </label>

        This form is shown instead of the title and remove button
        <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value="Todo is being edited now"
          />
        </form>
      </div>

      This todo is in loadind state
      <div data-cy="Todo" className="todo">
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
          />
        </label>

        <span data-cy="TodoTitle" className="todo__title">
          Todo is being saved now
        </span>

        <button type="button" className="todo__remove" data-cy="TodoDelete">
          ×
        </button>
      </div> */}
    </section>
  );
};
