import React from 'react';
import cn from 'classnames';

import {
  StateContext,
  DispatchContext,
  FocusContext,
} from './GlobalStateProvider';

import { toggleTodoCompleted } from '../services/ToggleTodo';
import { removeTodo } from '../services/RemoveTodo';

import { actions } from '../vars/ActionsTypes';
import { Todo } from '../types/Todo';

type Props = {
  editTitle: string;
  onChange: (value: string) => void;
};
const Section: React.FC<Props> = ({ editTitle, onChange }) => {
  const { todos, filter, editingTodo } = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);

  const { setFocus } = React.useContext(FocusContext);
  const editTodo = (id: number) => {
    if (editTitle.trim().length === 0) {
      dispatch({
        type: actions.REMOVE_TODO,
        payload: id,
      });

      setFocus();
    } else {
      dispatch({
        type: actions.EDIT_TODO,
        payload: editTitle.trim(),
      });
    }

    onChange('');
  };

  const startEditingTodo = (todo: Todo) => {
    onChange(todo.title);
    dispatch({
      type: actions.START_EDITING_TODO,
      payload: todo,
    });
  };

  const stopEditingTodo = () => {
    dispatch({
      type: actions.STOP_EDITING_TODO,
    });
  };

  const handleNewTodoKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: number,
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      editTodo(id);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      stopEditingTodo();
    }
  };

  const getFilteredTodos = () => {
    return todos.filter(todo => {
      switch (filter) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return true;
      }
    });
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {getFilteredTodos().map(todo => (
        <div
          data-cy="Todo"
          className={cn('todo', { completed: todo.completed })}
          key={todo.id}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={todo.completed}
              onChange={() => toggleTodoCompleted(todo.id, dispatch)}
            />
          </label>
          {editingTodo === todo ? (
            <form>
              <input
                data-cy="TodoTitleField"
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value={editTitle}
                onKeyDown={e => handleNewTodoKeyDown(e, todo.id)}
                onChange={e => onChange(e.target.value)}
                onBlur={() => editTodo(todo.id)}
                autoFocus
              />
            </form>
          ) : (
            <>
              <span
                data-cy="TodoTitle"
                className="todo__title"
                onClick={() => startEditingTodo(todo)}
              >
                {todo.title}
              </span>

              <button
                type="button"
                className="todo__remove"
                data-cy="TodoDelete"
                onClick={() => removeTodo(todo.id, dispatch)}
              >
                ×
              </button>
            </>
          )}
        </div>
      ))}
    </section>
  );
};

export default React.memo(Section);
