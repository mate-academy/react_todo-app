import { useContext, useEffect } from 'react';
import { StateContext } from '../GlobalContext/GlobalContext';
import { FILTER } from '../../types/Filter';
import { TodoItem } from '../Todo/TodoItem';

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
    const localTodos = localStorage.getItem('todos');

    if (todos.length === 0) {
      localStorage.clear();
    }

    if (!localTodos) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }

    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodo().map(todo => (
        <TodoItem todoItem={todo} key={todo.id} />
      ))}
    </section>
  );
};
