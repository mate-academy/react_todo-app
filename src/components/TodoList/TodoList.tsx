import { useContext } from 'react';
import { TodoItem } from '../TodoItem';
import { Todo } from '../../utils/helpers';
import { FilteredTodos, MyTodos } from '../../utils/GlobalContext';

export const TodoList = () => {
  const { todos } = useContext(MyTodos);
  const { filteredTodos } = useContext(FilteredTodos);

  return todos?.length ? (
    <ul className="todo-list">
      {filteredTodos.map((todo: Todo) => (
        <TodoItem todo={todo} key={+todo.id} />
      ))}
    </ul>
  ) : (
    <div />
  );
};
