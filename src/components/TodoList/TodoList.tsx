import { StateContext } from '../../Store';
import { useContext } from 'react';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const state = useContext(StateContext);
  const { todos, filterTodos } = state;

  let list = todos;

  if (filterTodos === 'Active') {
    list = list.filter(todo => todo.completed === false);
  }

  if (filterTodos === 'Completed') {
    list = list.filter(todo => todo.completed === true);
  }

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {list.map(todo => (
        <TodoItem todoItem={todo} key={todo.id} />
      ))}
    </section>
  );
};
