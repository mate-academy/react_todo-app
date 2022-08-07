import { FC } from 'react';
import { Todo } from '../styles/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[],
  onUpdate(id: number, todo: Todo | null): void,
};

export const TodoList: FC<Props> = ({ todos, onUpdate }) => (
  <ul className="todo-list" data-cy="todoList">
    {todos && todos.map(todo => (
      <TodoItem
        key={todo.id}
        todo={todo}
        onUpdate={onUpdate}
      />
    ))}
  </ul>
);
