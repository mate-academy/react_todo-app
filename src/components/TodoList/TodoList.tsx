import React, { useContext } from 'react';
import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';
import { StateContext } from '../../Store';
import { TodoItem } from '../TodoItem';

type Props = {
  filter: Filter;
  focusNewTodoField: () => void;
};

export const TodoList: React.FC<Props> = ({ filter, focusNewTodoField }) => {
  const { todos } = useContext(StateContext);

  const filteredTodos = todos.filter((todo: Todo) => {
    if (filter === Filter.Active) {
      return !todo.completed;
    }

    if (filter === Filter.Completed) {
      return todo.completed;
    }

    return true;
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          focusNewTodoField={focusNewTodoField}
        />
      ))}
    </section>
  );
};
