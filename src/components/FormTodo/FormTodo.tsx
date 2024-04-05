import React, { useContext, useEffect, useRef, useState } from 'react';
import { DispatchContext, StateContext } from '../../Store';
import { Todo } from '../../type';
import classNames from 'classnames';

export const FormTodo: React.FC = () => {
  const [title, setTitle] = useState('');
  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StateContext);
  const titleField = useRef<HTMLInputElement>(null);
  const allCompleted = todos.every((todo: Todo) => todo.completed);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.length > 1) {
      dispatch({ type: 'addTodo', id: +new Date(), title: title });
      setTitle('');
    }
  };

  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, []);

  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, [todos]);

  return (
    <>
      {todos.length >= 1 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allCompleted,
          })}
          data-cy="ToggleAllButton"
          onClick={() => dispatch({ type: 'toggleAll' })}
        />
      )}
      <form onSubmit={addTodo}>
        <input
          ref={titleField}
          data-cy="NewTodoField"
          value={title}
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          onChange={e => {
            setTitle(e.target.value);
          }}
        />
      </form>
    </>
  );
};
