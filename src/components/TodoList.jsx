import React, { useEffect, useState } from 'react';

import { TodoItem } from './TodoItem';

export const TodoList = ({ todos, setTodos }) => {
  const [hasToogleChecked, setHasToogleChecked] = useState(false);

  const toggleTodos = (event) => {
    const newTodos = todos.map(todo => ({
      ...todo,
      completed: event.target.checked,
    }));

    setTodos(newTodos);
  };

  const updateTodoTitle = (todoId, todoValue) => {
    const updateTitle = todos.map(todo => {
      if (todo.id === todoId) {
        return ({
          ...todo,
          title: todoValue,
        });
      }

      return todo;
    });

    setTodos(updateTitle);
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
      {!!todos.length && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            checked={hasToogleChecked}
            className="toggle-all"
            onChange={toggleTodos}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </>
      )}

      <ul className="todo-list">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleChecked={handleChecked}
            handleDelete={handleDelete}
            updateTodoTitle={updateTodoTitle}
          />
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
