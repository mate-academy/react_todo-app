import { FC } from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[] | null;
  deleteTodos: (todoId: number) => void;
  changeTodoTitle: (id: number, title: string) => void;
  changeTodoStatus: (id: number, completed: boolean) => void;
  allTodosCompleted: () => void;
};

export const TodoList: FC<Props> = ({
  todos,
  deleteTodos,
  changeTodoTitle,
  changeTodoStatus,
  allTodosCompleted,
}) => {
  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onClick={allTodosCompleted}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">
        {todos?.map(todo => (
          <TodoItem
            todo={todo}
            key={todo.id}
            onDeleteTodos={deleteTodos}
            changeTodoTitle={changeTodoTitle}
            changeTodoStatus={changeTodoStatus}
          />
        ))}
      </ul>
    </>
  );
};
