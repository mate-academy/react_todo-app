import { useContext } from 'react';
import { TodoContext } from '../../TodoContext';
import { Todo } from '../Todo/Todo';
import { Filter, TodoType } from '../../types/types';

type Props = {};

export const TodoList: React.FC<Props> = () => {
  const { state, filterTodo } = useContext(TodoContext);
  const getFilteredList = (currentState: TodoType[]) => {
    switch (filterTodo) {
      case Filter.Active: {
        return currentState.filter(({ completed }) => !completed);
      }

      case Filter.Completed: {
        return currentState.filter(({ completed }) => completed);
      }

      default:
        return currentState;
    }
  };

  const filteredList = getFilteredList(state);

  return (
    <ul className="todo-list" data-cy="todoList">
      {filteredList.map(todo => (
        <Todo
          todo={todo}
          key={todo.id}
        />
      ))}
    </ul>
  );
};
