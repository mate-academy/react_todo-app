import { useContext, useState } from 'react';
import { TodosContext } from './TodosContext';
import { Todos } from '../types/todos';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const Header: React.FC
  = () => {
    const { setTodos } = useContext(TodosContext);
    const [storedTodos, setStoredTodos] = useLocalStorage<Todos[]>('todos', []);
    const [newTodo, setNewTodo] = useState<Todos>({
      id: +new Date(),
      title: '',
      completed: false,
    });

    const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewTodo({
        ...newTodo,
        title: event.target.value,
      });
    };

    const addTodo = (event: React.FormEvent) => {
      event.preventDefault();

      if (newTodo.title.trim() !== '') {
        const updatedTodos = [...storedTodos, newTodo];

        setStoredTodos(updatedTodos);

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
