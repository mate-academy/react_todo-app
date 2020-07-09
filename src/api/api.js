import { v4 as uuidv4 } from 'uuid';

export const todos = [
  {
    id: uuidv4(),
    title: 'Not completed1',
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: 'Completed',
    isCompleted: true,
  },
  {
    id: uuidv4(),
    title: 'Completed',
    isCompleted: true,
  },
  {
    id: uuidv4(),
    title: 'Not completed2',
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: 'Not completed3',
    isCompleted: false,
  },
];
