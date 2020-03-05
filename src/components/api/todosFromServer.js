/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { v4 as uuidv4 } from 'uuid';
import React from 'react';

export const todosFromServer = [
  {
    id: uuidv4(), title: 'task 1', completed: false,
  },
  {
    id: uuidv4(), title: 'task 2', completed: false,
  },
  {
    id: uuidv4(), title: 'task 3', completed: false,
  },
];
