import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[],
  areAllCompleted: boolean,
  onToggleComplete: (todoId: number) => void,
  onToggleAll: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onDeleteTodo: (todoId: number) => void,
  onPatchTodo: (todoId: number, title: string) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  areAllCompleted,
  onToggleComplete,
  onToggleAll,
  onDeleteTodo,
  onPatchTodo,
}) => (
  <section className="main">
    <input
      type="checkbox"
      id="toggle-all"
      className="toggle-all"
      data-cy="toggleAll"
      checked={areAllCompleted}
      onChange={onToggleAll}
    />
    <label htmlFor="toggle-all">Mark all as complete</label>

    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
          onHandleToggleComplete={onToggleComplete}
          onDeleteTodo={onDeleteTodo}
          onPatchTodo={onPatchTodo}
        />
      ))}

      {/* <li className="completed">
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-completed" />
          <label htmlFor="toggle-completed">qwertyuio</label>
          <button type="button" className="destroy" data-cy="deleteTodo" />
        </div>
        <input type="text" className="edit" />
      </li> */}

      {/* <li className="editing">
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-editing" />
          <label htmlFor="toggle-editing">zxcvbnm</label>
          <button type="button" className="destroy" data-cy="deleteTodo" />
        </div>
        <input type="text" className="edit" />
      </li> */}

      {/* <li>
        <div className="view">
          <input type="checkbox" className="toggle" id="toggle-view2" />
          <label htmlFor="toggle-view2">1234567890</label>
          <button type="button" className="destroy" data-cy="deleteTodo" />
        </div>
        <input type="text" className="edit" />
      </li> */}
    </ul>
  </section>
);
