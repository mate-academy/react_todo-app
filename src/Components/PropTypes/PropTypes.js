import PropTypes from 'prop-types';

export const NewTodoProps = {
  addNewTodo: PropTypes.func,
};

export const TodoItemProps = {
  todoTitle: PropTypes.string,
  todoStatus: PropTypes.bool,
  todoId: PropTypes.string,
  handleTodoStatus: PropTypes.func,
  handleDeleteTodo: PropTypes.func,
};

export const TodoListProps = {
  todosList: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string,
    completed: PropTypes.bool,
  })),
  handleTodoStatus: PropTypes.func,
  handleDeleteTodo: PropTypes.func,
  handleDoubleClickEditTitle: PropTypes.func,
};

export const TodosFilterProps = {
  handleButtonChange: PropTypes.func,
  originalTodos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string,
    completed: PropTypes.bool,
  })),
  todosList: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string,
    completed: PropTypes.bool,
  })),
  buttonSelected: PropTypes.string,
  handleDeleteAllCompleted: PropTypes.func,
};
