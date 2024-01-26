import React, { useContext, useState } from 'react';
import { TodoItem } from '../TodoItem';
import { TodoContext } from '../../context/TodoContext';

export const TodoList: React.FC = () => {
  const [scrollVisible, setScrollVisible] = useState(true);
  const { filteredTodos } = useContext(TodoContext);

  return (
    <ul
      className="todo-list"
      data-cy="todosList"
      style={{
        maxHeight: 400,
        overflowY: scrollVisible ? 'auto' : 'hidden',
      }}
    >
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          setScrollVisible={setScrollVisible}
        />
      ))}
    </ul>
  );
};
