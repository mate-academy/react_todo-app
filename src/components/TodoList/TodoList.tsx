/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { SelectedTodosContext } from '../../contexts/SelectedTodosContext';

type Props = {};

export const TodoList: React.FC<Props> = () => {
  const { selectedTodos } = useContext(SelectedTodosContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {selectedTodos.map(todo => {
        return <TodoItem todo={todo} key={todo.id} />;
      })}
    </section>
  );
};
