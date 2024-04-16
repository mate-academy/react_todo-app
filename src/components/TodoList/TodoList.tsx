import { FC } from 'react';
import { TodoItem } from '../TodoItem';
import { Todo } from '../type';
type Props = {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, newTitle: string) => void;
};
export const TodoList: FC<Props> = ({
  todos,
  toggleTodo,
  deleteTodo,
  editTodo,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      ))}
    </section>
  );
};
