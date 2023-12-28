/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext } from 'react';
import { StateContext } from '../../TodosContext';
import { TodoItem } from '../TodoItem/TodoItem';
import { Status } from '../../types/enums/Status';

export const TodoList: React.FC = () => {
  const { todos, filter } = useContext(StateContext);

  const todoItems: JSX.Element[] = [];

  todos.forEach((todo) => {
    switch (filter) {
      case Status.All:
        todoItems.push(<TodoItem key={todo.id} todoItem={todo} />);
        break;

      case Status.Active:
        if (!todo.completed) {
          todoItems.push(<TodoItem key={todo.id} todoItem={todo} />);
        }

        break;

      case Status.Completed:
        if (todo.completed) {
          todoItems.push(<TodoItem key={todo.id} todoItem={todo} />);
        }

        break;

      default:
        todoItems.push(<TodoItem key={todo.id} todoItem={todo} />);
        break;
    }
  });

  return (
    <ul className="todo-list" data-cy="todoList">
      {todoItems}
    </ul>
  );
};
