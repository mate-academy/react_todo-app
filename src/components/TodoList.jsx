import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

export const TodoList = ({ todos, setTodos }) => {
  const [hasToogleChecked, setHasToogleChecked] = useState(false);

  const toggleTodos = (event) => {
    const newTodos = todos.map(todo => ({
      ...todo,
      completed: event.target.checked,
    }));

    setTodos(newTodos);
  };

  const handleChecked = (event, todoId) => {
    const newTodos = todos.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: event.target.checked,
        };
      }

      return todo;
    });

    setTodos(newTodos);
  };

  const handleDelete = (todoId) => {
    const newTodos = todos.filter(todo => (
      !(todo.id === todoId)
    ));

    setTodos(newTodos);
  };

  useEffect(() => {
    const completedTodos = todos.filter(todo => todo.completed).length;

    setHasToogleChecked(completedTodos === todos.length);
  }, [todos]);

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        checked={hasToogleChecked}
        className="toggle-all"
        onClick={toggleTodos}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={classNames({ 'completed': todo.completed })}
          >
            <div className="view">
              <input
                type="checkbox"
                className="toggle"
                checked={todo.completed}
                onChange={(event) => {
                  handleChecked(event, todo.id);
                }}
              />
              <label>{todo.title}</label>
              <button
                type="button"
                className="destroy"
                onClick={() => {
                  handleDelete(todo.id);
                }}
              />
            </div>
            <input type="text" className="edit" />
          </li>
        ))}

        {/* <li className="completed">
          <div className="view">
            <input type="checkbox" className="toggle" />
            <label>qwertyuio</label>
            <button type="button" className="destroy" />
          </div>
          <input type="text" className="edit" />
        </li> */}

        {/* <li className="editing">
          <div className="view">
            <input type="checkbox" className="toggle" />
            <label>zxcvbnm</label>
            <button type="button" className="destroy" />
          </div>
          <input type="text" className="edit" />
        </li> */}

        {/* <li>
          <div className="view">
            <input type="checkbox" className="toggle" />
            <label>1234567890</label>
            <button type="button" className="destroy" />
          </div>
          <input type="text" className="edit" />
        </li> */}
      </ul>
    </section>
  );
};
