import React, { useState, useContext } from 'react';
import classNames from 'classnames';
import { Todo } from '../types';
import { TodosContext } from './TodosContext';

type Props = {
  todo: Todo,
}

enum edit {
  Editing = 'editing',
}

export const TodoItem: React.FC<Props> = React.memo(({ todo }) => {
  const [editClass, setEditClass] = useState('');
  const [editTodoId, setEditTodoId] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const { todos, setTodos } = useContext(TodosContext);

  const toggleHandler = (id: number) => {
    setTodos(todos.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          completed: !el.completed,
        };
      }

      return el;
    }));
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(el => el.id !== id));
  };

  const editTodo = () => {
    setNewTitle(todo.title);
    setEditClass(edit.Editing);
    setEditTodoId('editTodo');
  };

  const replaceTitle = () => {
    const targetElement = todos.find(el => el.id === todo.id);

    if (targetElement && newTitle.length > 0) {
      targetElement.title = newTitle;
    }
  };

  const saveNewTitle = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      replaceTitle();
      setEditClass('');
    }

    if (event.key === 'Escape') {
      setEditClass('');
    }
  };

  const onblurHandler = () => {
    replaceTitle();
    setEditClass('');
  };

  return (
    <li
      className={classNames(
        { completed: todo.completed },
        editClass,
      )}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={() => toggleHandler(todo.id)}
        />

        <label
          onDoubleClick={editTodo}
          className="label"
        >
          {todo.title}
        </label>

        <button
          data-cy="deleteTodo"
          type="button"
          className="destroy"
          onClick={() => removeTodo(todo.id)}
        />
      </div>
      <input
        id={editTodoId}
        type="text"
        className="edit"
        ref={input => input && input.focus()}
        value={newTitle}
        onChange={event => setNewTitle(event.target.value.trim())}
        onKeyDown={saveNewTitle}
        onBlur={onblurHandler}
      />
    </li>
  );
});
