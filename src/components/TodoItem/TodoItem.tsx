import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { Todo } from '../../react-app-env';
import { changeTodo, deleteTodo, toggleTodoAction } from '../../store';

interface Props {
  todo: Todo,
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [editableTodoId, setEditableTodoId] = useState(0);
  const [todoTitle, setTodoTitle] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setTodoTitle(todo.title);
  }, [todo]);

  const editHandler = (key: string, id: number) => {
    if (key === 'Escape') {
      setTodoTitle(todo.title);
      setEditableTodoId(0);
    }

    if (key === 'Enter') {
      if (todoTitle.length) {
        dispatch(changeTodo({ id, todoTitle }));
      } else {
        dispatch(deleteTodo(id));
      }

      setTodoTitle('');
      setEditableTodoId(0);
    }
  };

  return (
    <li
      className={cn({
        completed: todo.completed,
        editing: todo.id === editableTodoId,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => {
            dispatch(toggleTodoAction(todo.id));
          }}
        />
        <label
          onDoubleClick={() => {
            setEditableTodoId(todo.id);
          }}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          aria-label="delete todo"
          data-cy="deleteTodo"
          onClick={() => dispatch(deleteTodo(todo.id))}
        />
      </div>
      <input
        type="text"
        id={editableTodoId === todo.id ? 'editTodo' : ''}
        value={todoTitle}
        className="edit"
        onChange={(event) => {
          setTodoTitle(event.target.value);
        }}
        onKeyDown={({ key }) => {
          editHandler(key, todo.id);
        }}
      />
    </li>
  );
};
