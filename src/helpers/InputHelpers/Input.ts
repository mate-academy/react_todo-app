import { Action } from '../../context/store';

export const setInputValue = (
  dispatch: React.Dispatch<Action>,
  value: string,
) => {
  dispatch({ type: 'setInputValue', payload: value });
};

export const handleInputChange = (
  event: React.ChangeEvent<HTMLInputElement>,

  updateInputValue: (value: string) => void,
) => {
  const { value } = event.target;

  updateInputValue(value);
};
