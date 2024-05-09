import { useContext, useEffect } from 'react';
import { Task } from '../Todo/Todo';
import { StateContext } from '../GlobalContext/GlobalContext';
import { FILTER } from '../../types/Filter';

export const Main = () => {
  const { todos, filterTodo } = useContext(StateContext);

  const filteredTodo = () => {
    return todos.filter(todo => {
      if (filterTodo === FILTER.ACTIVE) {
        return todo.completed === false;
      } else if (filterTodo === FILTER.COMPLETED) {
        return todo.completed === true;
      } else {
        return todo;
      }
    });
  };

  useEffect(() => {
    if (todos.length === 0) {
      localStorage.clear();
    } else {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodo().map(todo => (
        <Task task={todo} key={todo.id} />
      ))}
    </section>
  );
};
