import React, { useState } from 'react';

export const useTodoForm = (submitCallback: (title: string) => void) => {
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
