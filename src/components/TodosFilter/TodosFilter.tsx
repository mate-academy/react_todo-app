import { useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { FilterType } from '../../types/FilterType';
import { Todo } from '../../types/Todo';
import { useLocalStorage } from '../../utils/useLocaleStorage';
import { ContextTodos } from '../Context/ContextTodos';
import { Footer } from '../Footer';
import { TodoList } from '../TodoList';

type Props = {
  unCompletedTodos: Todo[] | void;
  completedTodos: Todo[] | void;
};

export const TodoFilter: React.FC<Props> = ({
  unCompletedTodos,
  completedTodos,

}) => {
  const { todos } = useContext(ContextTodos);
  const { filter = '/' } = useParams();

  const [typeOfFilter, setTypeOfFilter] = useLocalStorage(
    'filter',
    filter || '/',
  );

  const getFilteredTodos = useMemo(() => {
    let filteredTodos = [...todos];

    switch (typeOfFilter) {
      case FilterType.ACTIVE:
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;

      case FilterType.COMPLETED:
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;

      default:
        break;
    }

    return filteredTodos;
  }, [todos, typeOfFilter]);

  return (
    <>
      <section className="main">
        <TodoList todos={getFilteredTodos} />
      </section>

      <Footer
        unCompletedTodos={unCompletedTodos}
        completedTodos={completedTodos}
        typeOfFilter={filter}
        setTypeOfFilter={setTypeOfFilter}
      />
    </>
  );
};
