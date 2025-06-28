import { useContext, useMemo } from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { TodosContext } from '../../context/TodoContext';
import { FILTERS } from '../../utils/constants';

type Props = {
  filtredField: FILTERS;
};

export const TodoList: React.FC<Props> = ({ filtredField }) => {
  const { todos } = useContext(TodosContext);

  const filtredTodos = useMemo(() => {
    let filtered: Todo[];

    switch (filtredField) {
      case FILTERS.ACTIVE:
        filtered = todos.filter(t => !t.completed);
        break;

      case FILTERS.COMPLETED:
        filtered = todos.filter(t => t.completed);
        break;

      default:
        filtered = todos;
    }

    return filtered;
  }, [todos, filtredField]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {filtredTodos.map(t => (
        <TodoInfo key={t.id.toString()} todo={t} />
      ))}
    </section>
  );
};
