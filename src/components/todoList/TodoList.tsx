import { useTodosContext } from '../../context/TodosContext';
import { TodoItem } from '../todoItem/TodoItem';
import { useState } from 'react';

export const TodoList = () => {
  const { filteredTodoList } = useTodosContext();
  const [editingId, setEditingId] = useState<number | null>(null);

  const startEditingTitle = (id: number) => {
    setEditingId(id);
  };

  const onSave = () => {
    setEditingId(null);
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodoList.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          startEditingTitle={startEditingTitle}
          isEditing={editingId === todo.id}
          onSave={onSave}
        />
      ))}
    </section>
  );
};
