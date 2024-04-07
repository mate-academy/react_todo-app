import { useContext } from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { TodoContext } from '../../TodoContext';
import { Todo } from '../../types/Todo';
import { SortType } from '../../types/SortType';

type Props = {};

export const TodoList: React.FC<Props> = () => {
  const { todos, sortType, removeTodo, changeTodo } = useContext(TodoContext);
  const filteredTodos = todos.filter(todo => {
    switch (sortType) {
      case SortType.Active:
        return !todo.completed;

      case SortType.Completed:
        return todo.completed;

      default:
        return true;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map((todo, index) => (
        <TodoInfo
          todo={todo}
          key={todo.id}
          onRemove={() => removeTodo(index)}
          onChange={newValues =>
            changeTodo({ ...todo, ...newValues } as Todo, index)
          }
        />
      ))}
    </section>
  );
};
