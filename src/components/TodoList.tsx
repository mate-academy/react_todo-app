import { FC } from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  todos: Todo[],
  onDelete: (todoId: number) => void,
  onEdit: (todoId: number, todoTitle: string) => void,
  onChangeStatus: (todoId: number, todoStatus: boolean) => void,
};

export const TodoList: FC<Props> = ({
  todos,
  onDelete,
  onEdit,
  onChangeStatus,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => {
        return (
          <TodoItem
            todo={todo}
            key={todo.id}
            onDelete={onDelete}
            onEdit={onEdit}
            onChangeStatus={onChangeStatus}
          />
        );
      })}

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
