import React, { useContext } from 'react';
import '../styles/todo.scss';
import '../styles/todoapp.scss';
import { StateContext } from './ToDoContext';
import { FilterButtons } from '../types/FilterType';
import { ToDoItem } from './ToDoItem';

export const ToDoList: React.FC = () => {
  const { filterButton } = useContext(StateContext);
  const { todos } = useContext(StateContext);

  const filteredTodos = todos.filter(todo => {
    if (filterButton === FilterButtons.Completed) {
      return todo.completed;
    }

    if (filterButton === FilterButtons.Active) {
      return !todo.completed;
    }

    return true;
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <ToDoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
