/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import TodoItem from './TodoItem';

import { Todo, TodoPropsToUpdate } from '../types/todo';

type Props = {
  todos: Todo[]
  onTodoDelete: (todoId: number) => void
  onTodoUpdate: (todoId: number, propsToUpdate: TodoPropsToUpdate) => Promise<void>
};

const TodoList: React.FC<Props> = ({ todos, onTodoDelete, onTodoUpdate }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        onTodoDelete={onTodoDelete}
        onTodoUpdate={onTodoUpdate}
      />
    ))}
  </ul>
);

export default TodoList;
