import React, { useContext } from 'react';
import { TodoContext } from '../context/todo.context';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const {
    todos,
    todosStats,
    toggleAllTodos,
  } = useContext(TodoContext);

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={todosStats.todosTotal === todosStats.todosCompleted}
        onChange={toggleAllTodos}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todosList">
        {
          todos.map(todo => (
            <TodoItem todo={todo} key={todo.id} />
          ))
        }
      </ul>
    </section>
  );
};

export default TodoList;
