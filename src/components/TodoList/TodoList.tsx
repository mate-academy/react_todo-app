import { useContext } from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { StateContext } from '../TodosContext/TodosContext';
import { Status, Todo } from '../../types/types';

type Props = {};

export const TodoList: React.FC<Props> = () => {
  const { todos, filter } = useContext(StateContext);

  const completedTodos = () => {
    let newTodos = [];

    switch (filter) {
      case Status.Active:
        newTodos = todos.filter(
          (todo: Todo) => todo.completed === false,
        );
        break;

      case Status.Completed:
        newTodos = todos.filter(
          (todo: Todo) => todo.completed === true,
        );
        break;

      default:
        newTodos = [...todos];
    }

    return newTodos;
  };

  return (
    <ul className="todo-list" data-cy="todoList">
      {completedTodos().map(((todo: Todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
        />
      )))}
    </ul>
  );
};
