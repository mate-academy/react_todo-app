import React, { useContext, useEffect, useState } from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { TodoContext } from '../GlobalContext/GlobalContext';
import { FilterType } from '../../type/FilterType';
import { Todo } from '../../type/Todo';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
type Props = {
  filterValue: FilterType;
};

function filtering(todos: Todo[], filters: FilterType): Todo[] {
  switch (filters) {
    case FilterType.all:
      return todos;
    case FilterType.active:
      return todos.filter(todo => !todo.completed);
    case FilterType.completed:
      return todos.filter(todo => todo.completed);
  }
}

export const TodoList: React.FC<Props> = ({ filterValue }) => {
  const todos = useContext(TodoContext);
  const [visibleTodos, setVisibleTodos] = useState(todos);

  useEffect(() => {
    setVisibleTodos(filtering(todos, filterValue));
  }, [filterValue, todos]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      <TransitionGroup component="div">
        {visibleTodos.map(todo => (
          <CSSTransition key={todo.id} timeout={300} classNames="item">
            <TodoItem key={todo.id} todo={todo} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </section>
  );
};

/*
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

        <button type="button" className="todo__remove" data-cy="TodoDelete">
          ×
        </button>
      </div>

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

      <div data-cy="Todo" className="todo">
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
          />
        </label>
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
*/
