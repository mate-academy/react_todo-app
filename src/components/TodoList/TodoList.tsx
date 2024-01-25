import React, { useContext } from 'react';

import './TodoList.scss';
import TodoItem from '../TodoItem';
import { TodosContext } from '../../contexts/TodosContext';

const TodoList: React.FC = () => {
  const { preparedTodos } = useContext(TodosContext);

  return (
    <ul className="todo-list" data-cy="todosList">
      {preparedTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
