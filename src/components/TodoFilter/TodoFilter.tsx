import { useTodos } from '../../context/TodosContext';

export enum Status {
  All = '#/',
  Active = '#/active',
  Completed = '#/completed',
}

export const TodoFilter: React.FC = () => {
  const { handleFilterTodo } = useTodos();

  return (
    <ul className="filters" data-cy="todosFilter">
      {Object.entries(Status).map(([key, value]) => (
        <li key={key}>
          <a
            onClick={() => handleFilterTodo(key as keyof typeof Status)}
            href={value}
          >
            {key}
          </a>
        </li>
      ))}
    </ul>
  );
};
