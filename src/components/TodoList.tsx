import { memo } from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  onToggleCompleted: (id: number) => void,
  todos: Todo[],
  onRemoveTodo: (id: number) => void,
  onRenameTodo: (id: number, title: string) => void,
};

export const TodoList:React.FC<Props> = memo(({
  todos,
  onToggleCompleted,
  onRemoveTodo,
  onRenameTodo,
}) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleCompleted={onToggleCompleted}
          onRemoveTodo={onRemoveTodo}
          onRenameTodo={onRenameTodo}
        />
      ))}
    </ul>
  );
});
