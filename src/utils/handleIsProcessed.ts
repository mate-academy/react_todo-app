import { Dispatch, SetStateAction } from 'react';
import { IsProcessedMethod } from '../types/Todo';

export const handleIsProcessed = (
  method: IsProcessedMethod,
  todoId: number,
  setIsProcessed: Dispatch<SetStateAction<number[]>>,
) => {
  switch (method) {
    case 'ADD':
      setIsProcessed(current => [...current, todoId]);
      break;

    case 'DELETE':
      setIsProcessed(
        current => current.filter(id => id !== todoId),
      );
      break;

    default:
      break;
  }
};
