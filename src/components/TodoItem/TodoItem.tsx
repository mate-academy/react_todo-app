import React, { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [editing, setEditing] = useState(false);
  const [editingValue, setEditingValue] = useState(todo.title);
  const [editingId, setEditingId] = useState('');

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, [editingId, editing]);

  const toggleTodoCompleted = (id: string) => {
    const updateTodos = todos.map(currentTodo => {
      if (currentTodo.id.toString() === id) {
        return { ...currentTodo, completed: !currentTodo.completed };
      }

      return currentTodo;
    });

    setTodos(updateTodos);
  };

  const deleteTodo = (id: string) => {
    const updateTodos = todos.filter(
      currentTodo => currentTodo.id.toString() !== id,
    );

    setTodos(updateTodos);
  };

  const todoEdit = () => {
    setEditing(false);
    setEditingId(todo.id.toString());

    const editingTodos = todos.map(item => {
      if (todo.id === item.id) {
        return { ...item, title: editingValue };
      }

      return item;
    });

    setTodos(editingTodos);
  };

  return (
    <li
      key={todo.id.toString()}
      className={classNames('', {
        completed: todo.completed,
        // eslint-disable-next-line
        editing: editing,
      })}
      onDoubleClick={() => {
        setEditing(true);
        setEditingId(todo.id.toString());
      }}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={todo.id.toString()}
          checked={todo.completed}
          onChange={event => toggleTodoCompleted(event.target.id)}
        />
        {/* eslint-disable-next-line */}
        <label
          htmlFor={todo.id.toString()}
          onClick={event => {
            event.preventDefault();
          }}
        >
          {todo.title}
        </label>
        {/* eslint-disable-next-line */}
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => {
            deleteTodo(todo.id.toString());
          }}
        />
      </div>
      <input
        type="text"
        ref={titleField}
        className="edit"
        value={editingValue}
        onBlur={todoEdit}
        onKeyUp={event => {
          if (event.key === 'Escape' || event.key === 'Enter') {
            todoEdit();
          }
        }}
        onChange={event => {
          setEditingValue(event.target.value);
        }}
      />
    </li>
  );
};
