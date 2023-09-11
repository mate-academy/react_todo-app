import { useContext } from 'react';
import { TodosContext } from '../../TodosContext';
import { TodoItem } from '../TodoItem';

export const TodoList = () => {
  const { todos } = useContext(TodosContext);

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}

        {/* <li className="editing">
          <div className="view">
            <input type="checkbox" className="toggle" id="toggle-editing" />
            <label htmlFor="toggle-editing">zxcvbnm</label>
            <button type="button" className="destroy" data-cy="deleteTodo" />
          </div>
          <input type="text" className="edit" />
        </li> */}
      </ul>
    </section>
  );
};
