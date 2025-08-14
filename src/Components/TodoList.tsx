import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { TodoContext } from '../TodoContext';

export const TodoList: React.FC = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('TodoContext must be used within a TodoProvider');
  }

  const { filteredTodos, tempTodo, todos } = context;

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.length > 0 &&
        filteredTodos.map(todo => <TodoItem todo={todo} key={todo.id} />)}

      {tempTodo && !todos.some(t => t.id === tempTodo.id) && (
        <TodoItem todo={tempTodo} key={`temp-${tempTodo.id}`} />
      )}
    </section>
  );
};
