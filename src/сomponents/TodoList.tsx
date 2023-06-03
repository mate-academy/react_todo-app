import { FC, memo } from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[],
  tempTodo: Todo | null,
  onDelete: (id: number) => void,
  onChange: (id: number, property: Partial<Todo>) => void
}

export const TodoList: FC<Props> = memo((props) => {
  const {
    todos,
    tempTodo,
    onDelete,
    onChange,
  } = props;

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onChangeStatus={onChange}
        />
      ))}

      {tempTodo && (
        <TodoItem
          todo={tempTodo}
          key={0}
          onDelete={onDelete}
          onChangeStatus={onChange}
        />
      )}
    </section>
  );
});
