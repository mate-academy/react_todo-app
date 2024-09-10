import { useContext } from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';
import { TodosContext } from '../context/Store';

type Props = {};

export const TodoList: React.FC<Props> = ({}) => {
  const todos = useContext(TodosContext);
  const filteredTodos: Todo[] = todos.filter(t => {
    switch (t.filter) {
      case 'filterActive':
        return !t.completed;
      case 'filterCompleted':
        return t.completed;
      case 'filterAll':
        return t;
      default:
        return t;
    }
  });

  return (
    <>
      <section className="todoapp__main" data-cy="TodoList">
        {filteredTodos.map((todo: Todo) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </section>
    </>
  );
};
