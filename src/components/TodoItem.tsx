import { useState } from 'react';
import { Todo } from '../types/todo';
import { TodoForm } from './TodoForm';

type Props = {
  todo: Todo,
  onDelete: (id: number) => void;
  onUpdate: (todo: Todo) => void; // completed
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onDelete = () => {},
  onUpdate = () => {},
}) => {
  const [todoCompleted, setTodoCompleted] = useState(todo.completed);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>(todo.title);

  const handleCheckboxChange = () => {
    setTodoCompleted(!todoCompleted);
    onUpdate({ ...todo, completed: !todoCompleted });
  };

  const handleDeleteButtonClick = () => {
    onDelete(todo.id);
  };

  const startEditing = () => {
    setSelectedTodo(todo);
  };

  const finishEditing = () => {
    setSelectedTodo(null);
    // Update the title when finishing editing
    onUpdate({ ...todo, title: editedTitle });
  };

  const handleEditChange = (newTitle: string) => {
    setEditedTitle(newTitle);
  };

  return (
    <li
      className={`${selectedTodo === todo ? 'editing' : ''} ${
        todoCompleted ? 'completed' : ''
      } ${!todoCompleted && selectedTodo === todo ? 'view' : ''}`}
    >
      <div className="view" onDoubleClick={startEditing}>
        {selectedTodo === todo ? (
          <div>
            <input
              type="checkbox"
              className="toggle"
              id={`toggle-view-${todo.id}`}
              checked={todoCompleted}
              onChange={handleCheckboxChange}
            />
            <TodoForm
              onSubmit={() => {}}
              todo={{ ...todo, title: editedTitle }}
            />
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => handleEditChange(e.target.value)}
              onBlur={finishEditing}
            />
            <button
              type="button"
              className="destroy"
              data-cy="deleteTodo"
              aria-label="Delete"
              onClick={handleDeleteButtonClick}
            />
          </div>
        ) : (
          <div>
            <input
              type="checkbox"
              className="toggle"
              id={`toggle-view-${todo.id}`}
              checked={todoCompleted}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={`toggle-view-${todo.id}`}>{todo.title}</label>
            <button
              type="button"
              className="destroy"
              data-cy="deleteTodo"
              aria-label="Delete"
              onClick={handleDeleteButtonClick}
            />
          </div>
        )}
      </div>
    </li>
  );
};

// id = toggle-view toggle-completed, toggle-editing, className=toggle
// li view completed editing
