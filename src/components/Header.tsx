import React from 'react';

type Props = {
  inputText: string,
  setInputText: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void,
  handleKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void,
};

export const Header: React.FC<Props> = ({
  inputText,
  setInputText,
  handleKeyPress,
  handleKeyUp,
}) => {
  return (
    <header className="header">
      <h1>todos</h1>
      <form>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          value={inputText}
          onChange={setInputText}
          onKeyDown={handleKeyPress}
          onKeyUp={handleKeyUp}
        />
      </form>
    </header>
  );
};
