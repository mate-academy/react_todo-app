/* eslint-disable jsx-a11y/control-has-associated-label */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useContext, useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../../TodosContext/TodosContext';
import { Footer } from '../Footer/Footer';
import { Main } from '../Main/Main';
import { Header } from '../Header/Header';

export const TodoApp: React.FC = () => {
  const { todosCount } = useContext(TodosContext);

  const [id, setId] = useState(+new Date());
  const [title, setTitle] = useState('');

  const [isAllCompleted, setIsAllCompleted] = useState(true);

  const { addTodo, setAllAsComplete } = useContext(TodosContext);

  const handleCompleteAll = () => {
    setIsAllCompleted(!isAllCompleted);

    setAllAsComplete(isAllCompleted);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleEscPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setTitle('');
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newTodo: Todo = {
      id,
      title,
      completed: false,
    };

    if (newTodo.title.trim()) {
      addTodo(newTodo);
    } else {
      return;
    }

    setId(+new Date());

    setTitle('');
  };

  return (
    <div className="todoapp">
      <Header
        handleSubmit={handleSubmit}
        title={title}
        handleTitleChange={handleTitleChange}
        handleEscPress={handleEscPress}
      />

      {todosCount !== 0 ? (
        <>
          <Main handleCompleteAll={handleCompleteAll} />

          <Footer />
        </>
      ) : ''}
    </div>
  );
};
