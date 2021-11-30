// import { useState } from 'react';
import { TodoItem } from './TodoItem';

export const TodoList = ({ todosFromServer }) => {
  // const [todos, setTodos] = useState(todosFromServer);

  const handleCompletedChange = (todo) => {
    return {
      ...todo,
      completed: !todo.completed,
    };
  };

  return (
    <section className="main">
      <input type="checkbox" id="toggle-all" className="toggle-all" />
      {/* <label htmlFor="toggle-all">Mark all as complete</label> */}

      <ul className="todo-list">
        {todosFromServer.map(item => {
          return (
            <TodoItem
              handleCompletedChange={handleCompletedChange}
              todo={item}
              key={item.id}
            />
          );
        })}
      </ul>
    </section>
  );
};
