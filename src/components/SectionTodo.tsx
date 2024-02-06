import React, { useContext } from 'react';
import { Todolist } from './TodoList';
import { TodosContext } from './TodosContext';
import { Todo } from '../types/Todo';

interface Props {
  filteredTodos : Todo[];
}

const SectionTodo: React.FC<Props> = ({ filteredTodos }) => {
  const { toggleCompletionOfAllTodos } = useContext(TodosContext);

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onClick={toggleCompletionOfAllTodos}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <Todolist
        todos={filteredTodos}
      />
    </section>
  );
};

export default SectionTodo;
