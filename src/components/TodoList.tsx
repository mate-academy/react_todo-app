import { useContext, useState } from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';
import { TodosContext } from '../context/TodosContext';

type Props = {
  visibleTodos: Todo[];
  editingTitle: number;
  setEditingTitle: (editingTitle: number) => void;
};

export const TodoList: React.FC<Props> = ({
  visibleTodos,
  editingTitle,
  setEditingTitle,
}) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [titleEdit, setTitleEdit] = useState<string>('');

  function changeTodo(updatedTodo: Todo) {
    const newTodos = [...todos];
    const index = newTodos.findIndex(task => task.id === updatedTodo.id);

    newTodos.splice(index, 1, updatedTodo);

    setEditingTitle(0);

    setTodos(newTodos);
  }

  function deleteTodo(task: Todo) {
    const newTodos = todos.filter(todo => todo.id !== task.id);

    setTodos(newTodos);
  }

  function handleChangeSubmit(todo: Todo) {
    if (todo.title === titleEdit) {
      setEditingTitle(0);

      return;
    }

    if (!titleEdit) {
      deleteTodo(todo);

      return;
    }

    changeTodo({ ...todo, title: titleEdit.trim() });
  }

  return (
    !!todos.length && (
      <section className="todoapp__main" data-cy="TodoList">
        {visibleTodos.map(todo => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              changeTodo={changeTodo}
              editingTitle={editingTitle}
              setEditingTitle={setEditingTitle}
              titleEdit={titleEdit}
              setTitleEdit={setTitleEdit}
              handleChangeSubmit={handleChangeSubmit}
              deleteTodo={deleteTodo}
            />
          );
        })}
      </section>
    )
  );
};
