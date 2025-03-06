import React, { RefObject, useContext } from 'react';
import './TodoList.scss';
import { TodoContext } from '../../context/TodoContext';
import { FilterType } from '../../types/FilterType';
import { TodoItem } from '../TodoItem';

type Props = {
  filterType: FilterType;
  inputRef: RefObject<HTMLInputElement>;
};

export const TodoList: React.FC<Props> = ({ filterType, inputRef }) => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('TodoContext must be used within TodoProvider');
  const { todos } = context;

  const getFilteredTodos = () => {
    switch (filterType) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'all':
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} inputRef={inputRef} />
      ))}
    </section>
  );
};
