import React, { useContext, useState, useRef,
  useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import { TodosContext } from '../TodosContext';

export const TodoItem = ({ id }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [onEdit, setOnEdit] = useState(false);
  const todo = todos.find(searchTodo => searchTodo.id === id);
  const [editedTodo, setEditedTodo] = useState(todo.title);
  const textInput = useRef(null);

  const resetEditInput = useCallback(() => {
    setEditedTodo(todo.title);
    setOnEdit(false);
  }, [todo]);

  const editTodo = useCallback(() => {
    setTodos((prev) => {
      const newTodoList = prev;
      const index = newTodoList.findIndex(item => item.id === todo.id);

      newTodoList[index].title = (editedTodo.trim())
        ? editedTodo.trim()
        : newTodoList[index].title;
      resetEditInput();

      return ([...newTodoList]);
    });
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [editedTodo]);

  const onKeyDownHandle = useCallback((e) => {
    if (e.key === 'Enter') {
      editTodo();
    } else if (e.key === 'Escape') {
      resetEditInput();
    }
  }, [todo, editTodo]);

  const onCheckTodo = useCallback(({ target }) => setTodos((prev) => {
    const newTodoList = prev;
    const index = newTodoList.findIndex(item => item.id === todo.id);

    newTodoList[index].completed = target.checked;
    localStorage.setItem('todos', JSON.stringify(todos));

    return ([...newTodoList]);
  }), []);

  const onDeleteTodo = useCallback(() => setTodos((prev) => {
    const newTodoList = prev;
    const index = newTodoList.findIndex(item => item.id === todo.id);

    newTodoList.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));

    return ([...newTodoList]);
  }), []);

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
          onChange={onCheckTodo}
        />
        <label>{todo.title}</label>
        <button
          onClick={onDeleteTodo}
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
        onKeyDown={onKeyDownHandle}
        onBlur={() => editTodo()}
      />
    </li>
  );
};

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
};
