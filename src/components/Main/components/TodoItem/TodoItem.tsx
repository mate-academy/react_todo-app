import cn from 'classnames';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../../../../types/Todo';
import { DispatchContext, TodosContext } from '../../../../store/Store';
import { updatedTodos } from '../../../../utils/utils';
import { input } from '../../../../utils/input';
type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useContext(DispatchContext);
  const { todos, selectedTodo } = useContext(TodosContext);
  const [title, setTitle] = useState(todo.title);

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current && selectedTodo) {
      titleField.current.focus();
    }
  }, [selectedTodo]);

  const changeTitle = (todoItem: Todo) => {
    if (input.checkInput(title)) {
      input.deleteTodo(todo.id, todos, dispatch);
    } else {
      updatedTodos(dispatch, todos, todoItem, false, title);
    }
  };

  const changeCompleted = (todoItem: Todo) => {
    updatedTodos(dispatch, todos, todoItem, true);
  };

  return (
    <li
      key={todo.id}
      className={cn({
        editing: selectedTodo?.id === todo.id,
        completed: todo.completed,
      })}
      onDoubleClick={() => {
        dispatch({
          type: 'selectedTodo',
          payload: todo,
        });
      }}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={() => {
            changeCompleted(todo);
          }}
        />
        {/* <label htmlFor="toggle-view">{title}</label> */}
        <label>{title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => input.deleteTodo(todo.id, todos, dispatch)}
        />
      </div>
      <input
        ref={titleField}
        type="text"
        value={title}
        className="edit"
        onChange={e => setTitle(e.target.value)}
        onKeyUp={e => {
          input.handleKey(e, todo, dispatch, changeTitle, setTitle);
        }}
        onBlur={() => {
          changeTitle(todo);
          dispatch({
            type: 'selectedTodo',
            payload: null,
          });
        }}
      />
    </li>
  );
};
