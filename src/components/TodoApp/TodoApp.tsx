import React, { useContext, useState } from 'react';
import { TodosContext } from '../../TodosContext';

export const TodoApp: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const addTodo = useContext(TodosContext)?.addTodo;
  const validationTitle = useContext(TodosContext)?.validationTitle;

  return (
    <>
      {addTodo && validationTitle && (
        <form>
          <input
            type="text"
            value={title}
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={(e) => {
              setTitle(validationTitle(e.target.value));
            }}
            onKeyDown={(e) => {
              const { key } = e;

              switch (key) {
                case 'Escape':
                  setTitle('');
                  break;
                case 'Enter':
                  e.preventDefault();
                  if (validationTitle(title) !== '') {
                    addTodo(title);
                    setTitle('');
                  }

                  break;
                default:
                  break;
              }
            }}
          />
        </form>
      )}
    </>
  );
};
