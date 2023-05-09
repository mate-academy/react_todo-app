import { memo } from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  toggleCompleted: (id: number) => void,
  todos: Todo[],
  removeTodo: (id: number) => void,
  renameTodo: (id: number, title: string) => void,
};

export const TodoList:React.FC<Props> = memo(({
  todos,
  toggleCompleted,
  removeTodo,
  renameTodo,
}) => {
  return (
    <ul className="todo-list" data-cy="todosList">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleCompleted={toggleCompleted}
          removeTodo={removeTodo}
          renameTodo={renameTodo}
        />
      ))}
    </ul>
  );
});
