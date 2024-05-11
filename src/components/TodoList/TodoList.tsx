import React, { useContext } from 'react';
import { StateContext } from '../../store/TodoContext';
import { FilterFields } from '../../store/types';
import { TodoItem } from '../TodoItem/TodoItem';

export function TodoList() {
  const { todos, filter } = useContext(StateContext);
  const filteredTodos = todos?.filter(todo => {
    switch (filter) {
      case FilterFields.Active:
        return !todo.completed;
      case FilterFields.Completed:
        return todo.completed;
      default:
        return todo;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos?.map(todo => <TodoItem todo={todo} key={todo.id} />)}

      {/* This is a completed todo */}
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

        {/* Remove button appears only on hover */}
        <button type="button" className="todo__remove" data-cy="TodoDelete">
          ×
        </button>
      </div>

      {/* This todo is an active todo */}
      <TodoItem />

      {/* This todo is being edited */}
      <div data-cy="Todo" className="todo">
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
          />
        </label>

        {/* This form is shown instead of the title and remove button */}
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

      {/* This todo is in loadind state */}
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
      </div>
    </section>
  );
}
