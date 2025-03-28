import React, { useContext } from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';
import { TodosContext } from '../context/TodosContext';
import { FilteredTodosContext } from '../context/FilteredTodosContext';

export const TodoList: React.FC = () => {
  const context = useContext(TodosContext);
  const filteredContext = useContext(FilteredTodosContext);

  if (!context || !filteredContext) {
    throw new Error('TodoList must be used within a TodosProvider');
  }

  const { todos, setTodos, deleteTodo } = context;
  const { filteredTodos } = filteredContext;

  function markCompleted(todo: Todo) {
    const result = todos.map(item => {
      if (item.id === todo.id) {
        return { ...item, completed: !item.completed };
      } else {
        return item;
      }
    });

    setTodos(result);
  }

  return filteredTodos.map(todo => (
    <TodoItem
      key={todo.id}
      todo={todo}
      todos={todos}
      deleteTodo={deleteTodo}
      markCompleted={markCompleted}
      setTodos={setTodos}
    />
  ));
};
