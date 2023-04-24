import React,
{
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import {
  Box,
  Button,
  Checkbox,
  TextField,
} from '@mui/material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';

type Props = {
  todo: Todo;
  onDelete: (id: number) => void;
  onUpdateTodo: (id: number, data: Partial<Todo>) => void;
  isLoading: boolean,
};

export const TodoElement: React.FC<Props> = ({
  todo,
  onDelete,
  onUpdateTodo,
  isLoading,
}) => {
  const { title, completed, id } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [todoTitle, settodoTitle] = useState(title);

  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();

    if (!todoTitle) {
      onDelete(id);

      return;
    }

    onUpdateTodo(id, { title: todoTitle });
    setIsEditing(false);
  }, [todoTitle, todo]);

  const handleCancel = () => {
    setIsEditing(false);
    settodoTitle(title);
  };

  const inputField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputField.current !== null) {
      inputField.current.focus();
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCancel();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isEditing]);

  return (
    <Box
      className="todo-item"
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60px',
        gap: '10px',
        backgroundColor: `
          linear-gradient(180deg, #ECFFFD 0%, rgba(215, 255, 250, 0) 100%)
        `,
        border: '1px solid #C4C4C4',
        borderRadius: '8px',
        padding: '0 10px',
      }}
    >
      <Checkbox
        size="medium"
        checked={completed}
        onClick={() => onUpdateTodo(id, { completed: !completed })}
      />

      {isEditing
        ? (
          <form onSubmit={handleSubmit}>
            <TextField
              ref={inputField}
              focused
              variant="outlined"
              value={todoTitle}
              onChange={(event) => settodoTitle(event.target.value)}
              onBlur={handleCancel}
              sx={{
                height: '100%',
                width: '370px',
              }}
            />
          </form>
        ) : (
          <>
            <p
              style={{
                width: '295px',
                textAlign: 'left',
                textDecoration: completed ? 'line-through' : 'none',
                color: completed ? 'gray' : 'black',
              }}
              onDoubleClick={() => {
                setIsEditing(true);
                inputField.current?.focus();
              }}
            >
              {title}
            </p>

            <Button
              type="button"
              className="delete-button"
              onClick={() => onDelete(id)}
            >
              <ClearOutlinedIcon
                sx={{ color: 'black' }}
              />
            </Button>
          </>
        )}

      {isLoading && (
        <Loader />
      )}
    </Box>
  );
};
