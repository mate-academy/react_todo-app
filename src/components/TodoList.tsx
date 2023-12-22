import { useSignals } from '@preact/signals-react/runtime';
import { filteredTodos } from '../signals/todos-signal';
import { Todo } from '../types';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  useSignals();

  return (
    <ul className="todo-list" data-cy="todosList">
      {filteredTodos.value.map((todo: Todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
