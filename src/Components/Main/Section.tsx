import React, { useContext, useState } from 'react';
import { TodoList } from './TodoList';
import { TodoContext } from '../Context/TodoContext';
import { Todo } from '../../Types/Todo';
import { Status } from '../../Types/Status';

export const Section: React.FC = () => {
  const { todos, setTodos, filter } = useContext(TodoContext);
  const [toggle, setToggle] = useState(true);

  const filteredTodos = () => {
    const todosCopy = [...todos];

    switch (filter) {
      case Status.ALL:
        return todos;
      case Status.ACTIVE:
        return todosCopy.filter(item => !item.completed);
      case Status.COMPLETED:
        return todosCopy.filter(item => item.completed);
      default:
        return todos;
    }
  };

  const modifyStatus = ({ completed, ...data }:Todo) => {
    return { completed: toggle, ...data };
  };

  const handleClick = () => {
    setTodos(todos.map(todo => modifyStatus(todo)));
    setToggle(!toggle);
  };

  return (
    <section className="main">
      {todos.length !== 0 && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            checked={!toggle}
            onClick={handleClick}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </>

      )}

      <TodoList items={filteredTodos()} />
    </section>
  );
};
