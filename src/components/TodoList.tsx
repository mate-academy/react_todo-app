import React, { useContext } from 'react';
import { TodoContext } from '../TodoContext';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = React.memo(() => {
  const { todos, setTodos } = useContext(TodoContext);
  const { visibleTodoses } = useContext(TodoContext);

  const actTodo = todos.filter(elem => !elem.completed);

  const handleToggleAll = (e: boolean) => {
    setTodos(todos.map((elem) => {
      return {
        ...elem,
        completed: e,
      };
    }));
  };

  return (
    <>
      {todos.length !== 0 && (
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
        {visibleTodoses.map(el => (
          <TodoItem
            el={el}
            key={el.id}
          />
        ))}
      </ul>
    </>
  );
});
