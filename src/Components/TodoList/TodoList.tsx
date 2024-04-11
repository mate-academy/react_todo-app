import { useContext } from 'react';
import { TodoContext } from '../TodoContext/TodoContext';
import { TodoListItem } from '../Todo/TodoListItem';
import { Todo } from '../../types/Todo';

type FilterSettings = string;

function filterList(list: Todo[], settings: FilterSettings): Todo[] {
  return list.filter(item => {
    switch (settings) {
      case 'active':
        return item.completed === false;
      case 'completed':
        return item.completed === true;
      default:
        return list;
    }
  });
}

export const TodoList = () => {
  const { todosList, filterSettings } = useContext(TodoContext);
  const preparedList = filterList(todosList, filterSettings);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {preparedList.map(todo => (
        <TodoListItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
