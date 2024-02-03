import { useContext, useEffect, useRef, useState } from 'react';
import { TodosContext } from './TodosContext';
import { Todos } from '../types/todos';

export const Header: React.FC
  = () => {
    const { todos, setTodos } = useContext(TodosContext);
    const [newTodo, setNewTodo] = useState<Todos>({
      id: +new Date(),
      title: '',
      completed: false,
    });

  const titleField = useRef<HTMLInputElement>(null);
    useEffect(() => {
      if (titleField.current) {
        titleField.current.focus();
      }
  }, [newTodo.title]);

    const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewTodo({
        ...newTodo,
        title: event.target.value,
      });
    };

    const addTodo = (event: React.FormEvent) => {
      event.preventDefault();

      if (newTodo.title.trim() !== '') {
        const updatedTodo = {...newTodo, id: +new Date()};
        const updatedTodos=[...todos, updatedTodo];

        setTodos(updatedTodos);

        setNewTodo({
          id: +new Date(),
          title: '',
          completed: false,
        });
      }
    };

    return (
      <header className="header">
        <h1>todos</h1>

        <form
          key={newTodo.id}
          onSubmit={addTodo}
        >
          <input
            ref={titleField}
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodo.title}
            onChange={handleChangeQuery}
          />
        </form>
      </header>
    );
  };
