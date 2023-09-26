import { useContext, useMemo, useState } from 'react';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { Section } from '../Section/Section';
import { TodosContext } from '../TodoContext/TodoContext';

type Props = {};

export const TodoApp: React.FC<Props> = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const { todos, addTodo } = useContext(TodosContext);

  const handleTodoTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  };

  const isAllCompleted = todos.every(todo => todo.completed === true);

  const handleChangeStatusTodos = () => {
    addTodo(curentTodos => curentTodos.map(curTodo => ({
      ...curTodo,
      completed: !isAllCompleted,
    })));
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

    addTodo(currentTodos => [...currentTodos, newTodo]);
    setTodoTitle('');
  };

  const handleRemoveAllCompleted = () => {
    addTodo(curruntTodos => (
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
      {todos.length > 0
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
