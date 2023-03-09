import { Dispatch, SetStateAction } from 'react';
import { Todo } from '../../types/Todo';

export type Props = {
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  onDelete: (value: number) => void;
  todo: Todo;
};
