import { useState } from 'react';

const CHARACTERS_LIMIT = 35;

const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const [hasError, setHasError] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    setHasError(false);

    if (inputValue.length >= CHARACTERS_LIMIT) {
      return;
    }

    setValue(inputValue);
  };

  const clearInput = () => {
    setValue('');
  };

  return [value, hasError, setHasError, handleChange, clearInput] as const;
};

export { useInput };
