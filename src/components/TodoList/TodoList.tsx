import React, { useContext } from 'react';
import { Todo } from '../index';
import { StateContext } from '../../context/ToDoContext';
import { ToDoEnum } from '../../types/ToDo';

export const TodoList: React.FC = () => {
  const { todos, filterType } = useContext(StateContext);

  const filteredTodo = todos.filter(todo => {
    if (filterType === ToDoEnum.Active) {
      return !todo.completed;
    }

    if (filterType === ToDoEnum.Completed) {
      return todo.completed;
    }

    return true;
  });

  return (
    <>
      {todos.length !== 0 && (
        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodo.map((plan) => (
            <Todo key={plan.id} plan={plan} />
          ))}
        </section>
      )}
    </>
  );
};
