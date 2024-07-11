import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from '../../store';
import { DELETE_TODO, UPDATE_TODO } from '../../utils/actionTypes';
import { TodoModel } from '../../types/Todo.model';

export interface UseEditTodoForm {
  todo: TodoModel;
  onCancel: VoidFunction;
}

export const useEditTodoForm = ({ todo, onCancel }: UseEditTodoForm) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(todo.title);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onCancel();
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
    document.addEventListener('keyup', onKeyDown);

    return () => {
      document.removeEventListener('keyup', onKeyDown);
    };
  }, []);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value);
  };

  const handleSubmit = () => {
    const trimmedTitle = title.trim();

    if (trimmedTitle === title) {
      onCancel();
    }

    if (!trimmedTitle) {
      dispatch({ type: DELETE_TODO, payload: { id: todo.id } });
    }

    if (trimmedTitle) {
      dispatch({
        type: UPDATE_TODO,
        payload: { id: todo.id, title: trimmedTitle },
      });
    }

    onCancel();
  };

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    event.preventDefault();

    handleSubmit();
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleSubmit();
  };

  return {
    inputRef,
    title,
    onBlur,
    onSubmit,
    onChange,
  };
};
