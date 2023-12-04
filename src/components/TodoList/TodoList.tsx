import React, { useContext } from 'react';
import { TodosContext } from '../TodosContext';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList:React.FC = () => {
  const { filteredTodos, setTodos } = useContext(TodosContext);

  const completeAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const done = filteredTodos.map((item) => ({ ...item, completed: event.target.checked }));

    setTodos(done);
  };

  // const toggled = () => {
  //   const done = todos.map((item) => ({...item, completed: !item.completed}));

  //   setTodos(done);
  // }

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={!filteredTodos.find(todo => !todo.completed)}
        onChange={completeAll}
      />
      {filteredTodos.length !== 0
        && <label htmlFor="toggle-all">Mark all as complete</label>}

      {filteredTodos.length !== 0
        && (
          <ul className="todo-list" data-cy="todoList">
            {filteredTodos.map((todo) => (
              <TodoItem todo={todo} key={todo.id} />
            ))}
          </ul>
        )}

    </section>
  );
};
