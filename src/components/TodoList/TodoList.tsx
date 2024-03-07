import { useContext } from 'react';
// eslint-disable-next-line import/no-cycle
import { TodoItem } from '../TodoItem';
import { Todo } from '../../utils/helpers';
import { MyTodos, FilteredTodos } from '../../App';

export const TodoList = () => {
  const { todos } = useContext(MyTodos);
  const { filteredTodos } = useContext(FilteredTodos);

  return todos && todos.length > 0 ? (
    <ul className="todo-list">
      {filteredTodos.map((todo: Todo) => (
        <TodoItem todo={todo} key={+todo.id} />
      ))}
    </ul>
  ) : (
    <div />
  );
};
