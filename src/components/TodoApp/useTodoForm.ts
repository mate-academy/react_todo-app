import React, { useState } from 'react';

import { UseTodoFormReturnType } from './UseTodoFormReturnType';

export const useTodoForm = (
  submitCallback: (title: string) => void,
): UseTodoFormReturnType => {
  const [title, setTitle] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      return;
    }

    submitCallback(normalizedTitle);
    setTitle('');
  };

  return {
    title,
    setTitle,
    handleSubmit,
  };
};
