import React, { useState, useEffect, useContext } from 'react';
import TodoItem from '../TodoItem/TodoItem';
import { TodoContext } from '../../TodoContext';
import '../../styles/index.css';
import '../../styles/todo-list.css';

const TodoList = () => {
  const { filterTodos, todos, setTodos } = useContext(TodoContext);
  const [isChecked, setIsChecked] = useState(false);

  const handleToggleAll = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    setTodos(
      todos.map(todo => ({
        ...todo,
        complete: isChecked,
      })),
    );
  }, [isChecked]);

  return (
    <>
      {(todos.length > 0) && (
      <>
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          onChange={handleToggleAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
      </>
      )
      }
      <ul className="todo-list">
        {filterTodos.map(item => (
          <TodoItem
            item={item}
            key={item.id}
          />
        ))}
      </ul>

    </>
  );
};

export default TodoList;
