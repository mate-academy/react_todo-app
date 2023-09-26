import { useContext, useMemo, useState } from 'react';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { Section } from '../Section/Section';
import { TodosContext } from '../TodoContext/TodoContext';

export const TodoApp: React.FC = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const { todos, setTodos } = useContext(TodosContext);

  const handleTodoTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  };

  const handleTodoAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (!todoTitle.trim()) {
      return;
    }

    const newTodo = {
      id: +new Date(),
      title: todoTitle,
      completed: false,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
    setTodoTitle('');
  };

  const isAllCompleted = todos.every(todo => todo.completed);

  const handleChangeStatusTodos = () => {
    setTodos(curentTodos => curentTodos.map(curTodo => ({
      ...curTodo,
      completed: !isAllCompleted,
    })));
  };

  const handleRemoveAllCompleted = () => {
    setTodos(curruntTodos => (
      curruntTodos.filter(curTodo => !curTodo.completed)
    ));
  };

  const uncompletedTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed);
  }, [todos]);

  return (
    <div className="todoapp">
      <Header
        todoTitle={todoTitle}
        handleTodoAdd={handleTodoAdd}
        handleChange={handleTodoTitleChange}
      />
      {!!todos.length
        && (
          <>
            <Section
              isAllCompleted={isAllCompleted}
              handleChangeStatusTodos={handleChangeStatusTodos}
            />
            <Footer
              uncompletedTodos={uncompletedTodos}
              handleRemoveAllCompleted={handleRemoveAllCompleted}
            />
          </>
        )}
    </div>
  );
};
