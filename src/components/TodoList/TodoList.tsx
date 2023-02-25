import { FC } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  editingTodo: (id: number, title: string) => void;
};

export const TodoList: FC<Props> = ({
  todos,
  deleteTodo,
  toggleTodo,
  editingTodo,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
            editingTodo={editingTodo}
          />
        );
      })}
    </ul>
  );
};
