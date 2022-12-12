/* eslint-disable jsx-a11y/control-has-associated-label */

import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[],
  setTodos: (todos: Todo[]) => void,
  setActiveTodos: (active: number | ((prev: number) => number)) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  setActiveTodos,
}) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {todos.map((todo) => (
        <TodoItem
          todo={todo}
          todos={todos}
          setTodos={setTodos}
          setActiveTodos={setActiveTodos}
          key={todo.id}
        />
      ))}
      {/* <li>
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-view" />
          <label htmlFor="toggle-view">asdfghj</label>
          <button type="button" className="destroy" data-cy="deleteTodo" />
        </div>
        <input type="text" className="edit" />
      </li>

      <li className="completed">
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-completed" />
          <label htmlFor="toggle-completed">qwertyuio</label>
          <button type="button" className="destroy" data-cy="deleteTodo" />
        </div>
        <input type="text" className="edit" />
      </li>

      <li className="editing">
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-editing" />
          <label htmlFor="toggle-editing">zxcvbnm</label>
          <button type="button" className="destroy" data-cy="deleteTodo" />
        </div>
        <input type="text" className="edit" />
      </li>

      <li>
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-view2" />
          <label htmlFor="toggle-view2">1234567890</label>
          <button type="button" className="destroy" data-cy="deleteTodo" />
        </div>
        <input type="text" className="edit" />
      </li> */}
    </ul>
  );
};
