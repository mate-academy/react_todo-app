import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Form } from '../Form/Form';
import { Todo } from '../../Types/Todo';
import { TodoList } from '../TodoList/TodoList';
import { Footer } from '../Footer/Footer';
import {
  getTodos,
  deleteTodo,
  changeTodo,
} from '../../api/api';

export const TodoApp = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortQuery = searchParams.get('filterBy') || '';
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completed, setCompleted] = useState(0);
  const [activeTodos, setActiveTodos] = useState(0);

  useEffect(() => {
    getTodos()
      .then(res => setTodos(res));
  }, []);

  useEffect(() => {
    const active = todos.filter(a => !a.completed);

    setActiveTodos(active.length);
  }, [todos]);

  useEffect(() => {
    deleteTodo(completed);

    getTodos()
      .then(res => setTodos(res));
  }, [completed]);

  const handleCheckbox = (todo: Todo) => {
    changeTodo(todo.id, !todo.completed);
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <Form
          setTodos={setTodos}
          todos={todos}
        />
      </header>

      <section className="main">
        {todos.length >= 1 && (
          <>
            <TodoList
              todos={todos}
              sortQuery={sortQuery}
              setCompleted={setCompleted}
              handleCheckbox={handleCheckbox}
            />

            <Footer
              sortQuery={sortQuery}
              activeTodos={activeTodos}
              setSearchParams={setSearchParams}
              todos={todos}
            />
          </>
        )}
      </section>
    </section>
  );
};
