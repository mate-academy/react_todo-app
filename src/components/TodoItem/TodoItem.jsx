import React, { useContext, useState, useRef,
  useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import { TodosContext } from '../TodosContext';

export const TodoItem = ({ id }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [onEdit, setOnEdit] = useState(false);
  const [editedTodo, setEditedTodo] = useState('');
  const todo = todos.find(searchTodo => searchTodo.id === id);
  const textInput = useRef(null);

  const editTodo = useCallback(() => {
    setTodos((prev) => {
      const newTodoList = prev;
      const index = newTodoList.findIndex(item => item.id === todo.id);

      newTodoList[index].title = (editedTodo !== '')
        ? editedTodo
        : newTodoList[index].title;
      setEditedTodo('');
      setOnEdit(false);

      return ([...newTodoList]);
    });
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [editedTodo]);

  useEffect(() => {
    textInput.current.focus();
  }, [onEdit]);

  return (
    <li
      className={ClassNames({
        completed: todo.completed,
        editing: onEdit,
      })}
      onDoubleClick={() => setOnEdit(true)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={({ target }) => setTodos((prev) => {
            const newTodoList = prev;
            const index = newTodoList.findIndex(item => item.id === todo.id);

            newTodoList[index].completed = target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            return ([...newTodoList]);
          })}
        />
        <label>{todo.title}</label>
        <button
          onClick={() => setTodos((prev) => {
            const newTodoList = prev;
            const index = newTodoList.findIndex(item => item.id === todo.id);

            newTodoList.splice(index, 1);
            localStorage.setItem('todos', JSON.stringify(todos));

            return ([...newTodoList]);
          })}
          type="button"
          className="destroy"
        />
      </div>
      <input
        type="text"
        ref={textInput}
        className="edit"
        value={editedTodo}
        onChange={({ target }) => setEditedTodo(target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            editTodo();
          } else if (e.key === 'Escape') {
            setEditedTodo(todo.title);
            setOnEdit(false);
          }
        }}
        onBlur={() => editTodo()}
      />
    </li>
  );
};

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
};
