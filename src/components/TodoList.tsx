/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import { TodoUpdateContext } from '../store/TodosContext';
import { TodoItem } from './TodoItem';
import { Todo } from '../types/todo';

interface Props {
  filteredTodos: Todo[];
}

export const TodoList: React.FC<Props> = ({ filteredTodos }) => {
  const { deleteTodo, updateTodo } = useContext(TodoUpdateContext);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [editedValue, setEditedValue] = useState('');

  const onSaveNewTitle = () => {
    const normalizedQuery = editedValue.trim();

    if (!selectedTodo) {
      return;
    }

    if (!normalizedQuery) {
      deleteTodo(selectedTodo.id);

      return;
    }

    updateTodo({
      ...selectedTodo,
      title: normalizedQuery,
    });

    setSelectedTodo(null);
  };

  return (
    <ul className="todo-list" data-cy="todosList">
      {filteredTodos.map(todo => (
        <React.Fragment key={todo.id}>
          <TodoItem
            todo={todo}
            selectedTodo={selectedTodo}
            onTodoSelect={(newTodo: Todo | null) => setSelectedTodo(newTodo)}
            newValue={editedValue}
            onValueEdit={(newValue: string) => setEditedValue(newValue)}
            onSaveNewTitle={onSaveNewTitle}
          />
        </React.Fragment>
      ))}
    </ul>
  );
};
