import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const TodoEdit = ({
  todos,
  todo,
  saveData,
  setTodos,
}) => {
  const [titleBeforeEdit, setTitleBeforeEdit] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    setTitleBeforeEdit(todo.title);
    inputRef.current.focus();
  }, [todo.id]);

  const handleUpdatedDone = (event, todoId) => {
    if (event.key === 'Enter') {
      const newTodos = todos.map((elem) => {
        if (elem.id === todoId) {
          return {
            ...elem,
            toggle: true,
          };
        }

        return elem;
      });

      setTodos(newTodos.filter(el => el.title !== ''));
      saveData(newTodos.filter(el => el.title !== ''));
    } else if (event.key === 'Escape') {
      const newTodos = todos.map((elem) => {
        if (elem.id === todoId) {
          return {
            ...elem,
            title: titleBeforeEdit,
            toggle: true,
          };
        }

        return elem;
      });

      setTodos(newTodos);
      saveData(newTodos);
    }
  };

  const onClickOutSide = (todoId) => {
    const newTodos = todos.map((elem) => {
      if (elem.id === todoId) {
        return {
          ...elem,
          title: titleBeforeEdit,
          toggle: true,
        };
      }

      return elem;
    });

    setTodos(newTodos);
    saveData(newTodos);
  };

  const onEdit = (event, todoId) => {
    const newTodos = todos.map((elem) => {
      if (elem.id === todoId) {
        return {
          ...elem,
          title: event.target.value,
        };
      }

      return elem;
    });

    setTodos(newTodos);
  };

  return (
    <input
      ref={inputRef}
      type="text"
      className="edit"
      value={todo.title}
      onChange={(event) => {
        onEdit(event, todo.id);
      }}
      onBlur={() => onClickOutSide(todo.id)}
      onKeyDown={event => (
        handleUpdatedDone(event, todo.id)
      )}
    />
  );
};

TodoEdit.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired).isRequired,
  setTodos: PropTypes.func.isRequired,
  saveData: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TodoEdit;
