import { useContext } from 'react';
import { TodosContext } from '../../TodosContext';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';

export const TodoList = () => {
  const { visibleTodos } = useContext(TodosContext);

  return (
    <ul className="todo-list" data-cy="todosList">
      {visibleTodos.map((todo: Todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
