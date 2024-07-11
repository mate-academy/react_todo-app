import { useState } from 'react';
import { useDispatch } from '../../store';
import { CREATE_TODO } from '../../utils/actionTypes';

export const useCreateTodoForm = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setInputValue(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = inputValue.trim();

    if (trimmedTitle) {
      dispatch({ type: CREATE_TODO, payload: { title: trimmedTitle } });
    }

    setInputValue('');
  };

  return {
    inputValue,
    onChange,
    onSubmit,
  };
};
