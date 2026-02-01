/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Todo } from './types/type';
import { TodoList } from './componentes/todolist';
import { useLocalStorage } from './localstorage/localstorage';
import { TodoContext } from './context/todocontext';
import { TodoApp } from './componentes/todoApp';

export const App: React.FC = () => {
  const [title, setTitle] = useState<string>('');

  const [todo, setTodo] = useLocalStorage<Todo[]>('todo', []);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const [isShowFooter, setIsShowFooter] = useState<boolean>(false);
  const [isShowActiveAll, setIsShowActiveAll] = useState<boolean>(false);

  const addTodo = (newTodo: Todo) => {
    setTodo([...todo, newTodo]);
  };

  const reset = () => {
    setTitle('');
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim().length === 0) {
      return;
    }

    addTodo({
      id: +new Date(),
      title: title,
      completed: false,
    });

    reset();
  };

  const handleSelected = (id: number) => {
    const newArray = todo.map(i => {
      if (i.id === id) {
        return { ...i, completed: !i.completed };
      }

      return i;
    });

    setTodo(newArray);
  };

  const handleRemove = (id: number) => {
    setTodo(
      todo.filter(i => {
        return i.id !== id; // retorne o array de objetos com os ojetos cujo id é diferente do id do elemento que foi clicado
      }),
    );
  };

  const filteredTodo = todo.filter(t => {
    /* todo tem todos os elementos do array
      a unica coisa que filter faz é dizer: mostre os ativos, mostre todos, mostre os completos
      não posso filtrar o valor de todo e dar um setTodo pois isso vai subcrever os valores.
      */
    if (!t) {
      return false;
    } else if (filter === 'active') {
      return t.completed === false;
    } else if (filter === 'completed') {
      return t.completed === true;
    }

    return true;
  });

  const handleActiveAll = () => {
    const allCompleted = todo.every(
      t => t.completed === true,
    ); /* retorna true se todos t.completed forem true*/

    const newArray = todo.map(t => {
      return {
        ...t,
        completed: !allCompleted,
      }; /* completed sera sobrescrevido com a negação do allcompleted, assim
       conseguimos alternar entre false e true, o spreed copiará todas as propriedades */
    });

    setTodo(newArray);
  };

  const handleFilterAll = () => setFilter('all');

  const handleActive = () => setFilter('active');

  const handleCompleted = () => setFilter('completed');

  const handleRemoveCompleted = () => {
    setTodo(todo.filter(t => t.completed === false));
  };

  useEffect(() => {
    setIsShowFooter(todo.some(t => t && t.title && t.title.trim().length > 0));
  }, [todo]); // executado quando todo muda
  /* .some(callback) retorna verdadeiro true se callback retornar um valor verdadeiro para pelo menos um elemento na matriz,
  caso contrário , retorna falso.*/

  useEffect(() => {
    setIsShowActiveAll(
      filteredTodo.every(f => f.completed === true),
    ); /* toda vez que houver uma alteração na
    dependencia filteredtodo o useefect é ativado e faz a verificação do settIsShowActiveAll
    every verifica se todos são true, a condição que passei como callback, se todos forem true ele retorna true
    */
  }, [filteredTodo]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {isShowFooter && (
            <button
              type="button"
              className={`todoapp__toggle-all ${isShowActiveAll ? 'active' : ''}`}
              data-cy="ToggleAllButton"
              onClick={() => handleActiveAll()}
            />
          )}

          {/* Add a todo on form submit */}
          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={handleTitle}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          <TodoContext.Provider
            value={{
              todo,
              setTodo,
              handleSelected,
              handleRemove,
              filteredTodo,
            }}
          >
            <TodoList />
          </TodoContext.Provider>
        </section>

        {/* Hide the footer if there are no todos */}
        {isShowFooter && (
          <footer className="todoapp__footer" data-cy="Footer">
            <TodoContext.Provider
              value={{
                todo,
                handleRemoveCompleted,
                filter,
                handleSelected,
                handleRemove,
                handleActive,
                handleCompleted,
                handleFilterAll,
              }}
            >
              <TodoApp />
            </TodoContext.Provider>
          </footer>
        )}
      </div>
    </div>
  );
};
