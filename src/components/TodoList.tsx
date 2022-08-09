import { FC } from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[],
  handleChange: (id: number) => void,
  deleteTodo: (id: number) => void,
  editTodo: (id: number, newTitile: string) => void,
};

export const TodoList: FC<Props> = ({
  todos,
  handleChange,
  deleteTodo,
  editTodo,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleChange={handleChange}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      ))}
    </ul>
  );
};
