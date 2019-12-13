import React from 'react';
import TodoHeader from './TodoHeader';
import TodoFooter from './TodoFooter';
import TodoMain from './AppMain';

const FILTER_TYPES = {
  all: 'all',
  completed: 'completed',
  active: 'active',
};

class App extends React.Component {
  state = {
    todoList: [], allCompleted: false, filter: FILTER_TYPES.all,
  };

  handleAddingTodo = (todo) => {
    this.setState(prevState => ({ todoList: [...prevState.todoList, todo] }));
  };

  toggleTodoCompleted = (id) => {
    this.setState(({ todoList }) => (
      { todoList: todoList.map(item => (
        item.id === id ? {
          ...item, completed: !item.completed,
        } : item)) }));

    this.setState(({ todoList }) => (
      { allCompleted: todoList.every(item => item.completed) }
    ));
  };

  deleteTodo = (id) => {
    this.setState(({ todoList }) => (
      { todoList: todoList
        .filter(item => item.id !== id) }
    ));
  };

  selectAllTodos = () => {
    this.setState(({ todoList, allCompleted }) => ({
      allCompleted: !allCompleted,
      todoList: todoList
        .map(item => ({
          ...item, completed: !allCompleted,
        })),
    }));
  };

  setFilter = (filter) => {
    this.setState({ filter: FILTER_TYPES[filter] });
  };

  clearCompletedTodos= () => {
    this.setState(({ todoList }) => (
      { todoList: todoList
        .filter(item => !item.completed) }
    ));
  };

  render() {
    const { todoList, filter, allCompleted } = this.state;
    const getFilteredTodos = (filterParam) => {
      switch (filterParam) {
        case 'active':
          return todoList.filter(todo => !todo.completed);
        case 'completed':
          return todoList.filter(todo => todo.completed);
        default:
          return todoList;
      }
    };

    const visibleTodos = getFilteredTodos(filter);

    return (
      <section className="todoapp">
        <TodoHeader addTodo={this.handleAddingTodo} />
        <TodoMain
          todos={visibleTodos}
          allCompleted={allCompleted}
          handleCheck={this.toggleTodoCompleted}
          handleDelete={this.deleteTodo}
          completeAll={this.selectAllTodos}
          todosLength={todoList.length}
        />
        {todoList.length > 0 && (
          <TodoFooter
            todos={todoList}
            currentFilter={filter}
            handleFilter={this.setFilter}
            handleClearButton={this.clearCompletedTodos}
          />
        )}
      </section>
    );
  }
}

export default App;
