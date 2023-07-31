import { ChangeEvent, KeyboardEventHandler, useState } from 'react';

import {
  Input,
  ToggleTodo,
  StyledTodoItem,
  TodoLabel,
  DeleteButton,
} from './styled-components';
import { TodoType } from '../types/Todo';
import { useTodos } from '../contexts/TodosContext';

type TodoItemProps = {
  todo: TodoType;
};

export const TodoItem = ({ todo: { completed, id, title } }: TodoItemProps) => {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(title);
  const { handleToggleCompleted, handleDeleteTodo, handleTitleUpdate }
    = useTodos();

  const handleTitleChange = () => {
    if (!inputValue) {
      handleDeleteTodo(id);

      return;
    }

    if (title !== inputValue) {
      handleTitleUpdate(id, inputValue);
    }

    setEditing(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setInputValue(e.target.value);
  };

  const handleKeyUp: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Escape') {
      setEditing(false);
      setInputValue(title);
    } else if (e.key === 'Enter') {
      handleTitleChange();
    }
  };

  return (
    <StyledTodoItem $edited={editing} $status={completed ? 'complete' : 'view'}>
      <div className="view">
        <ToggleTodo
          onClick={() => handleToggleCompleted(id)}
          checked={completed}
          readOnly
          type="checkbox"
        />
        <TodoLabel onDoubleClick={() => setEditing(true)}>{title}</TodoLabel>
        <DeleteButton
          onClick={() => handleDeleteTodo(id)}
          type="button"
          data-cy="deleteTodo"
        />
      </div>
      <Input
        type="text"
        onBlur={handleTitleChange}
        value={inputValue}
        onChange={handleInputChange}
        onKeyUp={handleKeyUp}
      />
    </StyledTodoItem>
  );
};
