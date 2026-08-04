import { useState, useRef, useEffect } from 'react';
import { useTodo } from '../context/TodoContext';

// додавання нового завдання
export const TodoForm = ({ addTodo }: { addTodo: (title: string) => void }) => {
  // стан для збереження тексту в інпуті
  const [newTodo, setNewTodo] = useState('');

  // створюємо реф для інпуту та отримуємо доступ до списку завдань з контексту
  const inputRef = useRef<HTMLInputElement>(null);
  const { todos } = useTodo();

  // зберігаємо попередню довжину масиву завдань для відстеження видалення
  const prevTodosLengthRef = useRef(todos.length);

  // ефект для повернення фокуса на інпут після видалення завдання
  useEffect(() => {
    if (todos.length < prevTodosLengthRef.current) {
      inputRef.current?.focus();
    }

    prevTodosLengthRef.current = todos.length;
  }, [todos.length]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // зупиняємо перезавантаження
    event.preventDefault();

    if (newTodo.trim() === '') {
      return;
    }

    // додавання завдання до загального списку!!!!!!!!!
    addTodo(newTodo.trim());
    // очищуємо інпут
    setNewTodo('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
        autoFocus
      />
    </form>
  );
};
