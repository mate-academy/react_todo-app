import React, { useContext } from 'react';
import { TodosContext } from '../../context/TodosContext';
import { Todo } from '../../types/todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  filteredTodos: Todo[];
};

export const TodoList: React.FC<Props> = ({ filteredTodos }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const isBtnActive = todos.every(todo => todo.completed);

  const togglerAllCompleteHandler = () => {
    const newTodos: Todo[] = todos.map(todo => ({
      ...todo,
      completed: !isBtnActive,
    }));

    setTodos(newTodos);
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={isBtnActive}
        onClick={togglerAllCompleteHandler}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">
        {filteredTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  );
};
