import { useContext, useEffect } from 'react';
import { StateContext } from '../../store/todoReducer';
import { TodoItem } from '../Todo/TodoItem';
import { Filter } from '../../types/state';

export const TodoList = () => {
  const { todos, filter } = useContext(StateContext);

  let filteredTodos;

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  switch (filter) {
    case Filter.active: {
      filteredTodos = todos.filter(todo => !todo.completed);
      break;
    }

    case Filter.completed: {
      filteredTodos = todos.filter(todo => todo.completed);
      break;
    }

    default:
      filteredTodos = todos;
      break;
  }

  return (
    <>
      <section className="todoapp__main" data-cy="TodoList">
        <ul>
          {filteredTodos.map(todo => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
        </ul>
      </section>
    </>
  );
};
