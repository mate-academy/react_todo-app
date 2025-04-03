/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import { TodoField } from '../TodoField';
import { TodoContext } from '../../contexts/TodoContext';

type Props = {};

export const TodoList: React.FC<Props> = () => {
  // console.log('render list');
  const { filteredTodos } = useContext(TodoContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoField key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
