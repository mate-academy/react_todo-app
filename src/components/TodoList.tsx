/* eslint-disable jsx-a11y/control-has-associated-label */
import { useSignals } from '@preact/signals-react/runtime';
import { todos } from '../signals/todos-signal';
import { Todo } from '../types';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  // eslint-disable-next-line
  console.log('TodoList render');
  useSignals();

  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.value.map((todo: Todo) => (
        <TodoItem todo={todo} key={todo.id} />
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
  );
};
