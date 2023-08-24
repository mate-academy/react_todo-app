import React, { useContext } from 'react';
import { TodosContext } from '../../TodoProvider';
import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList: React.FC = () => {
  const { todos, filterType, setTodos } = useContext(TodosContext);

  const completedTodos = todos.filter(todo => todo.completed);
  const areAllTodosCompleted = completedTodos.length === todos.length;

  const filteredItems = (type: Filter): Todo[] => {
    switch (type) {
      case Filter.COMPLETED:
        return todos.filter(todo => todo.completed);
      case Filter.ACTIVE:
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  };

  const toggleAllTodo = () => {
    setTodos(todos.map(todo => (
      { ...todo, completed: !areAllTodosCompleted }
    )));
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={areAllTodosCompleted}
        onChange={toggleAllTodo}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">
        {filteredItems(filterType).map((todo) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </ul>
    </section>
  );
};
