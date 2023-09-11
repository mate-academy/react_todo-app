import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[],
  deleteTodoIds: number[],
  updatedTodoIds: number[],
  deleteTodo: (currentId: number) => Promise<void>,
  updateTodo: (updatedTodo: Todo) => Promise<void>,
  checkTodo: (selectedTodo: Todo, isCompleted?: boolean) => void,
  isTodoSaved: boolean,
};

export const TodoList:React.FC<Props> = ({
  todos,
  deleteTodoIds,
  updatedTodoIds,
  deleteTodo,
  updateTodo,
  checkTodo,
  isTodoSaved,
}) => (
  <section className="todoapp__main">
    {todos.map(todo => (
      <TodoItem
        todo={todo}
        deleteTodoIds={deleteTodoIds}
        updatedTodoIds={updatedTodoIds}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
        checkTodo={checkTodo}
      />
    ))}

    {isTodoSaved && (
      <div className="todo">
        <label className="todo__status-label">
          <input type="checkbox" className="todo__status" />
        </label>

        <span className="todo__title">
          Todo is being saved now
        </span>

        <div className="modal overlay is-active">
          <div className="
            modal-background
            has-background-white-ter
          "
          />
          <div className="loader" />
        </div>
      </div>
    )}
  </section>
);
