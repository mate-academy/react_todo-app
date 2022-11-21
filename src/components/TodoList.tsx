import { FC } from 'react';
// import { useParams } from 'react-router-dom';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[];
  toggleTodo: (todoId: number, completed: boolean) => void;
  removeTodo: (todoId: number) => void;
  changeTodoTitle: (todoId: number, title: string) => void;
}

export const TodoList: FC<Props> = ({
  todos,
  toggleTodo,
  removeTodo,
  changeTodoTitle,
}) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
          changeTodoTitle={changeTodoTitle}
        />
      ))}
    </ul>
  );
};
