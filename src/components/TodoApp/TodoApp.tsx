import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';
import { useLocalStorage } from '../../utils/useLocalStorage';
import { TodoList } from '../TodoList';
import { TodosFilter } from '../TodosFilter';

export const TodoApp = () => {
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const [copyTodos, setCopyTodos] = useLocalStorage<Todo[]>('todos', []);

  const [changedTitleTodoId, setChangedTitleTodoId]
    = useState<number | null>(null);

  const { status } = useParams();

  const activeTodosLength = useMemo(() => (
    copyTodos.filter(el => !el.completed).length
  ), [copyTodos]);

  const [activeToggleAll, setActiveToggleAll]
    = useState(false);
  const [newEditedTitle, setNewEditedTitle] = useState('');

  useEffect(() => {
    setActiveToggleAll(activeTodosLength === 0);
  }, [activeTodosLength]);

  const completedTodos = useMemo(() => (
    copyTodos.filter(todo => todo.completed)), [copyTodos]);

  const createNewTodo = (title: string): Todo => ({
    id: +new Date(),
    title,
    completed: false,
  });

  const handleInputChange
  = (event: React.ChangeEvent<HTMLInputElement>, param: string) => {
    const { value } = event.target;

    if (param === 'newTodo') {
      setNewTodoTitle(value);
    }

    if (param === 'updateTittle') {
      setNewEditedTitle(value);
    }
  };

  const handleSubmitNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTitle = newTodoTitle.trim();

    if (newTitle.length === 0) {
      setNewTodoTitle('');

      return;
    }

    const newTodo = createNewTodo(newTitle);
    const newTodos = copyTodos ? [...copyTodos, newTodo] : [newTodo];

    setTodos(newTodos);
    setCopyTodos(newTodos);

    setNewTodoTitle('');
  };

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    const updatedTodoCompleted = todos.find(todo => todo.id === +name);

    if (updatedTodoCompleted) {
      updatedTodoCompleted.completed = !updatedTodoCompleted.completed;
    }

    setTodos([...todos]);
    setCopyTodos([...copyTodos]);
  };

  const handleToggleAll = () => {
    const newTodos = copyTodos.map(todo => (
      { ...todo, completed: !activeToggleAll }
    ));

    setTodos(newTodos);
    setCopyTodos(newTodos);
  };

  useEffect(() => {
    const visibledTodos = copyTodos.filter(todo => {
      switch (status) {
        case Status.ACTIVE.toLowerCase():
          return !todo.completed;

        case Status.COMPLETED.toLowerCase():
          return todo.completed;

        default:
          return todo;
      }
    });

    setTodos(visibledTodos);
  }, [status, copyTodos, activeToggleAll]);

  const deleteTodo = (id: number) => {
    const index = copyTodos.findIndex(todo => todo.id === id);

    const newTodos = copyTodos.filter((_todo, i) => i !== index);

    setTodos(newTodos);
    setCopyTodos(newTodos);
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget;

    deleteTodo(+name);
  };

  const handleClearCompleted = () => {
    const newTodos = copyTodos.filter(todo => !todo.completed);

    setTodos(newTodos);
    setCopyTodos(newTodos);
  };

  const handleEdit = (event: React.MouseEvent<HTMLLabelElement>) => {
    const { id, title } = event.currentTarget;

    const changedTodoTitleId = todos.find(todo => todo.id === +id)?.id;

    setChangedTitleTodoId(changedTodoTitleId as number);
    setNewEditedTitle(title);
  };

  const updateTitle = () => {
    const updatedTodo = todos.find(todo => todo.id === changedTitleTodoId);

    if (newEditedTitle === updatedTodo?.title) {
      setChangedTitleTodoId(null);

      return;
    }

    if (newEditedTitle.length === 0 && changedTitleTodoId) {
      deleteTodo(changedTitleTodoId);

      setChangedTitleTodoId(null);

      return;
    }

    if (updatedTodo) {
      updatedTodo.title = newEditedTitle;
      setTodos([...todos]);
      setCopyTodos([...todos]);
    }

    setChangedTitleTodoId(null);
  };

  const handleBlur = () => {
    updateTitle();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Escape'
    || event.code === 'Enter'
    || event.code === 'NumpadEnter') {
      updateTitle();
    }
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmitNewTodo}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodoTitle}
            onChange={(event) => handleInputChange(event, 'newTodo')}
          />
        </form>
      </header>

      <section className="main">
        {copyTodos.length > 0 && (
          <>
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={activeToggleAll}
              onChange={handleToggleAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
          </>
        )}
        <TodoList
          todos={todos}
          handleToggle={handleToggle}
          handleDelete={handleDelete}
          changedTitleTodoId={changedTitleTodoId}
          handleEdit={handleEdit}
          newEditedTitle={newEditedTitle}
          handleInputChange={handleInputChange}
          handleBlur={handleBlur}
          handleKeyDown={handleKeyDown}
        />
      </section>

      {((copyTodos.length > 0 && todos.length > 0)
       || copyTodos.length > 0
       || (status === Status.COMPLETED.toLowerCase()
        && completedTodos.length === 0 && copyTodos.length > 0)) && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${activeTodosLength} items left`}
          </span>

          <TodosFilter />

          {completedTodos.length > 0 && (
            <button
              type="button"
              className="clear-completed"
              onClick={handleClearCompleted}
            >
              Clear completed
            </button>
          )}

        </footer>
      )}
    </div>
  );
};
