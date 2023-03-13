import { Error } from '../../enums/Error';

export type Props = {
  setCurrentError: (value: Error) => void;
  currentError: Error
};
