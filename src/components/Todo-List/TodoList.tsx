import { useContext } from 'react';
import { TodoItem } from '../Todo-Item/TodoItem';
import { TodosContext } from '../../TodosContext';

export const TodoList: React.FC = () => {
  const { todos } = useContext(TodosContext);

  return (
    <ul className="todo-list" data-cy="todosList">
      {todos.length > 0 &&
        todos.map(todo => <TodoItem todo={todo} key={todo.id} />)}

      {/*

      <li className="editing">
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-editing" />
          <label htmlFor="toggle-editing">zxcvbnm</label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            aria-label="Close"
          />
        </div>
        <input type="text" className="edit" />
      </li>

      <li>
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-view2" />
          <label htmlFor="toggle-view2">1234567890</label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            aria-label="Close"
          />
        </div>
        <input type="text" className="edit" />
      </li> */}
    </ul>
  );
};
