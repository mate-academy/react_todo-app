import React, { useContext, useState } from 'react';
import { TodoItem } from './TodoItem';
import { TodosContext } from './TodosContext';

export const TodoList: React.FC = () => {
  const { todos, setTodos, filteredTodos } = useContext(TodosContext);
  const [checkAll, setCheckAll] = useState(false);

  const handleClickAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const allCompleted = event.target.checked;

    setTodos(todos.map((todo) => ({
      ...todo,
      completed: allCompleted,
    })));
    setCheckAll(!checkAll);
  };

  return (
    <>
      {todos.length > 0 && (
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onChange={handleClickAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list" data-cy="todosList">
            {filteredTodos.map(todo => (
              <TodoItem todo={todo} key={todo.id} />
            ))}
          </ul>
        </section>
      )}
    </>
  );
};
