import { useState } from 'react';

// type Props = {
//   onSubmit: ()
// };

export const Form = () => {
  const [title, setTitlte] = useState('');

  // const restForm = () => {
  //   setTitlte('');
  // };

  // const onSubmit

  return (
    <form>
      <input
        type="text"
        data-cy="createTodo"
        className="new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={event => setTitlte(event.target.value)}
      />
    </form>
  );
};
