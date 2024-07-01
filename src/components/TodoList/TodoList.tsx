import { useContext } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';
import { TodoContext } from '../../context';
import { Status } from '../../types/Status';

type Props = {};

export const TodoList: React.FC<Props> = () => {
  const { todos, status } = useContext(TodoContext);

  const getList = (sortType: Status): Todo[] => {
    switch (sortType) {
      case Status.active:
        return todos.filter(todo => !todo.completed);
      case Status.completed:
        return todos.filter(todo => todo.completed);
      case Status.all:
        return todos;
    }
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {getList(status).map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          // setEditingId={setEditingId}
          // isEditing={todo.id === editingId}
        />
      ))}
    </section>
  );
};
