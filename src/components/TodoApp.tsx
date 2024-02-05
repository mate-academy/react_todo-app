import { useContext, useState, useEffect } from 'react';
import { TodoList } from './TodoList';
import { TodosContext } from '../store/TodosContext';
import { Status } from '../types/Status';
import { TodoFooter } from './TodoFooter';

export const TodoApp = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [unCompletedTodos, setUncompletedTodos] = useState(0);
  const [filter, setFilter] = useState(Status.All);

  useEffect(() => {
    let allUnCompletedTodos = 0;

    todos.forEach(todo => {
      allUnCompletedTodos += todo.completed ? 0 : 1;
    });
    setUncompletedTodos(allUnCompletedTodos);
  }, [todos]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo = {
      title: newTodoTitle,
      id: +Date.now(),
      completed: false,
    };

    setTodos(prev => [...prev, newTodo]);
    setNewTodoTitle('');
  };

  const [filteredTodos, setFilteredTodos] = useState(todos);

  useEffect(() => {
    const filterTodos = () => {
      switch (filter) {
        case Status.Active:
          return todos.filter(todo => !todo.completed);
        case Status.Completed:
          return todos.filter(todo => todo.completed);
        default:
          return todos;
      }
    };

    setFilteredTodos(filterTodos());
  }, [filter, todos]);

  const removeCompletedTodos = () => {
    setTodos(prev => prev.filter(el => !el.completed));
  };

  return (
    <div className="todoapp">
      <header className="header">
        <a href="/">
          <h1>TODO</h1>
        </a>

        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
          />
        </form>
      </header>

      {todos.length !== 0 && (
        <>
          <TodoList items={filteredTodos} />
          <TodoFooter
            unCompletedTodos={unCompletedTodos}
            filter={filter}
            setFilter={setFilter}
            todos={todos}
            removeCompletedTodos={removeCompletedTodos}
          />
        </>
      )}
    </div>
  );
};
