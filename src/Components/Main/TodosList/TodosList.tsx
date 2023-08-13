import React, { useContext } from 'react';
import { TodoContext } from '../TodosContext';
import { TodosItem } from '../TodosItem';

export const TodosList: React.FC = () => {
  const {
    todo,
    setTodo,
    filterTodos,
    toggleAll: isAllToggled,
  } = useContext(TodoContext);

  const handleToggleAll = () => {
    setTodo(todo.map(todos => ({ ...todos, completed: isAllToggled })));
  };

  return (
    <section className="main">
      {todo.length > 0 && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onChange={() => handleToggleAll()}
            checked={isAllToggled}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list" data-cy="todoList">
            {filterTodos().map(todos => (
              <TodosItem items={todos} key={todos.id} />
            ))}
          </ul>
        </>
      )}
    </section>
  );
};
