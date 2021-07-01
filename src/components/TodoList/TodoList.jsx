import React, { useState, useEffect, useMemo, useRef } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

export const TodoList = ({ todos, setTodos }) => {
  const [selectedId, setSelectedId] = useState(0);
  const [newTitle, setNewTitle] = useState('');
  const inputElement = useRef(null);
  const { pathname } = useLocation();

  const filterTodos = useMemo(() => (pathname !== '/'
    ? todos.filter(todo => (
      pathname === '/completed'
        ? todo.completed
        : !todo.completed))
    : todos), [pathname, todos]);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  });

  const toggleStatusAll = () => {
    const areCompleted = todos.every(todo => todo.completed);
    const changeTodosStatus = todos.map(todo => (
      { ...todo, completed: areCompleted ? !todo.completed : true }
    ));

    setTodos(changeTodosStatus);
  };

  const toggleStatus = (todoId) => {
    const findetTodo = todos.find(todo => todo.id === todoId);

    findetTodo.completed = !findetTodo.completed;

    setTodos(prev => [...prev]);
  };

  const deleteTodo = (todoId) => {
    const filteredTodos = todos.filter(todo => todo.id !== todoId);

    setTodos(filteredTodos);
  };

  const handleBlur = (id) => {
    const todochangeTitle = todos.find(todo => todo.id === id);

    todochangeTitle.title = newTitle.trim();

    setTodos(prev => [...prev]);
    setNewTitle('');
    setSelectedId(0);
  };

  const handleKeyDown = (e, title, todoId) => {
    const changeTitle = todos.find(todo => todo.id === todoId);

    switch (e.key) {
      case 'Enter':
        changeTitle.title = newTitle.trim();

        setTodos(prev => [...prev]);
        setNewTitle(newTitle);
        setSelectedId(0);

        break;
      case 'Escape':

        setTodos(prev => [...prev]);
        setNewTitle(title);
        setSelectedId(0);

        break;

      default:

        break;
    }
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        onChange={() => toggleStatusAll()}
        checked={todos.every(todo => todo.completed) && todos.length}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list">
        {filterTodos.map(todo => (
          <li
            key={todo.id}
            className={
                classnames({
                  editing: selectedId === todo.id,
                  completed: todo.completed,
                })
              }
            onDoubleClick={(e) => {
              setSelectedId(todo.id);
              setNewTitle(todo.title);
            }}
          >
            <div className="view">
              <input
                type="checkbox"
                className="toggle"
                checked={todo.completed}
                onChange={() => toggleStatus(todo.id)}
              />
              <label>{todo.title}</label>
              <button
                type="button"
                className="destroy"
                onClick={() => deleteTodo(todo.id)}
              />
            </div>
            <input
              type="text"
              className="edit"
              value={newTitle}
              ref={selectedId === todo.id ? inputElement : null}
              onChange={e => setNewTitle(e.target.value)}
              onBlur={() => handleBlur(todo.id)}
              onKeyDown={e => handleKeyDown(e, todo.title, todo.id)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

TodoList.propTypes = {
  setTodos: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};
