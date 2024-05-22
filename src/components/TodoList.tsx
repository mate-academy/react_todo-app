import { useContext } from 'react';
import { ToDoContext } from '../store/AppContext';
import { SingleToDo } from './SingleToDo';
import { ToDo } from '../types/types';

export const TodoList: React.FC = () => {
  const { state } = useContext(ToDoContext);
  const { todoList } = state;

  const visibleToDos = todoList.filter((todo: ToDo) => {
    if (state.filter === 'All') {
      return todo;
    }

    if (state.filter === 'Active') {
      return !todo.completed;
    }

    if (state.filter === 'Completed') {
      return todo.completed;
    }

    return todo;
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleToDos.map((todo: ToDo) => (
        <SingleToDo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
