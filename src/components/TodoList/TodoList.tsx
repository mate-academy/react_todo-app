import React from 'react';
import { Todo, Property } from '../../types';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[],
  tempTodo: Todo | null,
  removeTodo: (id: number) => void,
  removedTodoId: number | null,
  updateTodo: (id: number, data: Property) => void,
  isLoadingAll: boolean,
};

export const TodoList: React.FC<Props> = ({
  todos,
  tempTodo,
  removeTodo,
  removedTodoId,
  updateTodo,
  isLoadingAll,
}) => (
  <ul className="todoapp__main">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        removeTodo={removeTodo}
        removedTodoId={removedTodoId}
        updateTodo={updateTodo}
        isLoadingAll={isLoadingAll}
      />
    ))}
    {tempTodo && (
      <div className="todo">
        <label className="todo__status-label">
          <input type="checkbox" className="todo__status" />
        </label>
        <input
          defaultValue={tempTodo.title}
          className="todo__title"
          disabled
        />
        <button type="button" className="todo__remove">×</button>

        <div className="overlay">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    )}
  </ul>
);
