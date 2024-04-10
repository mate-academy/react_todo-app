import React, { useContext } from 'react';
import { StateContext } from '../context/ReduxContex';
import { Todo } from '../types/types';
import { TodoInfo } from './TodoInfo/TodoInfo';

export const TodoAppMain: React.FC = () => {
  const { filteredTodos: filterTodos, all, todos } = useContext(StateContext);

  const renderTodo = all ? todos : filterTodos;

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {renderTodo.map((todo: Todo) => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
