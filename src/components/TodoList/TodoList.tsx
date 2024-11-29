import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import { useTodos } from '../../context/context';
import { SelectedBy } from '../../types/SelectedBy';

const TodoList: React.FC = () => {
  const { todos, selectedBy } = useTodos();

  const filteredTodos = todos.filter(todo =>
    selectedBy === SelectedBy.completed ? todo.completed : !todo.completed,
  );

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {(selectedBy === SelectedBy.all ? todos : filteredTodos).map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};

export default TodoList;
