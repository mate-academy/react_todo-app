import React from 'react';
import { Todo } from '../context/TodosContext';
import TodoItem from './TodoItem';

interface Props {
  todos: Todo[];
  'data-cy'?: string;
}

const TodoList: React.FC<Props> = ({ todos, 'data-cy': dataCy }) => (
  <ul className="todo-list" data-cy={dataCy}>
    {todos.map(todo => (
      <TodoItem key={todo.id} todo={todo} />
    ))}
  </ul>
);

export default TodoList;
