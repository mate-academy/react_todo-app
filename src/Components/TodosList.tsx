import React, { useContext, useState } from 'react';
import { Todo } from '../Types/Todo';
import { TodoItem } from './TodoItem';
import { TodosContext } from '../TodosContext/TodosContext';

export const TodosList: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const [checked, setCheced] = useState(false);

  const handleClickAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const allCompleted = event.target.checked;

    setTodos(todos.map((todo) => ({
      ...todo,
      completed: allCompleted,
    })));
    setCheced(!checked);
  };

  return (
    <section className="main">

      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all active"
        data-cy="toggleAll"
        onChange={handleClickAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">
        {todos.map((todo: Todo) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </ul>

    </section>
  );
};
