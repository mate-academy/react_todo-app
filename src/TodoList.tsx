import { FC } from 'react';
import { Todo } from './Todo';
import { TodoItem } from './TodoItem';

interface PropsTodoList {
  todos: Todo[];
  handleToggle(id: number): void;
  handleDeleteTodo(id: number): void;
  editTitle(editById: number, tempTitle: string) : void
}

export const TodoList: FC<PropsTodoList> = ({
  todos, handleToggle, handleDeleteTodo, editTitle,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => {
        const { id } = todo;

        return (
          <TodoItem
            todo={todo}
            handleToggle={handleToggle}
            key={id}
            handleDeleteTodo={handleDeleteTodo}
            editTitle={editTitle}
          />
        );
      })}
    </ul>
  );
};
