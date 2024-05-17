import { ChangeEvent, useState } from 'react';

export const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return {
    value,
    handleChange,
    reset,
    setValue,
  };
};
