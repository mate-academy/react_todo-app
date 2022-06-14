import React, { useContext } from 'react';
import { TodoContext } from '../TodoContext';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const { todo, setTodo } = useContext(TodoContext);
  const { todoses } = useContext(TodoContext);

  const actTodo = todo.filter(elem => !elem.completed);

  const handleToggleAll = (e: boolean) => {
    setTodo(todo.map((elem) => {
      return {
        ...elem,
        completed: e,
      };
    }));
  };

  return (
    <>
      {todo.length !== 0 && (
        <>
          <input
            type="checkbox"
            checked={actTodo.length === 0}
            onChange={e => handleToggleAll(e.target.checked)}
            id="toggle-all"
            data-cy="toggleAll"
            className="toggle-all"
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </>
      )}

      <ul
        className="todo-list"
        data-cy="todoList"
      >
        {todoses.map(el => (
          <TodoItem
            el={el}
            key={el.id}
          />
        ))}
      </ul>
    </>
  );
};
