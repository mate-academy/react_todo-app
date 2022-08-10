/* eslint-disable jsx-a11y/control-has-associated-label */
import { Todo, TodoActionType } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  changeTodo: (id: number, action: TodoActionType, newTitle?: string) => void;
};

export const TodoList: React.FC<Props> = ({ todos, changeTodo }) => {
  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => (
        <TodoItem todo={todo} changeTodo={changeTodo} />
      ))}
    </ul>
  );
};
