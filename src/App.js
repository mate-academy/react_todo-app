import React from 'react';
import TodoList from './TodoList';
import TodoHeader from './TodoHeader';
import TodoFooter from './TodoFooter';

export const FILTER_TYPES = {
  all: 'all',
  active: 'active',
  completed: 'completed',
};

class App extends React.Component {
  state = {
    todoList: [],
    filterIdentifier: FILTER_TYPES.all,
  };

  handleAddTodo = (title) => {
    this.setState(prevState => ({
      todoList: [
        ...prevState.todoList,
        {
          id: +Date.now(),
          title,
          isCompleted: false,
        },
      ],
    }));
  };

  deleteTodo = (id) => {
    this.setState(prevState => ({
      todoList: prevState.todoList
        .filter(todoItem => todoItem.id !== id),
    }));
  };

  setFilter = (currentFilter) => {
    this.setState({
      filterIdentifier: currentFilter,
    });
  };

  filterTodos = () => {
    switch (this.state.filterIdentifier) {
      case FILTER_TYPES.active:
        return this.state.todoList.filter(todo => !todo.isCompleted);
      case FILTER_TYPES.completed:
        return this.state.todoList.filter(todo => todo.isCompleted);
      default:
        return this.state.todoList.filter(todo => todo.id);
    }
  };

  toggleTodoCompleted = (id) => {
    this.setState(prevState => ({
      todoList: prevState.todoList.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        }

        return todo;
      }),
    }));
  };

  toggleAllTodosCompleted = () => {
    this.setState(prevState => ({
      todoList: prevState.todoList
        .map(todo => ({
          ...todo,
          isCompleted: prevState.todoList
            .some(todoItem => !todoItem.isCompleted),
        })),
    }));
  };

  removeCompletedTodos = () => {
    this.setState(prevState => ({
      todoList: prevState.todoList
        .filter(todoItem => !todoItem.isCompleted),
    }));
  };

  render() {
    const {
      todoList,
      filterIdentifier,
    } = this.state;
    const amountOfActiveTodos = todoList
      .filter(todo => !todo.isCompleted).length;

    return (
      <section className="todoapp">
        <TodoHeader addTodo={this.handleAddTodo} />

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={todoList.every(todo => todo.isCompleted)}
            onClick={this.toggleAllTodosCompleted}
          />
          {todoList.length > 0 && (
            <label htmlFor="toggle-all">Mark all as complete</label>
          )}
          <TodoList
            filteredTodos={this.filterTodos()}
            handleCheck={this.toggleTodoCompleted}
            handleDelete={this.deleteTodo}
          />
        </section>

        {(todoList.length > 0) && (
          <TodoFooter
            todos={todoList}
            onSetFilter={this.setFilter}
            currentFilter={filterIdentifier}
            amountOfActiveTodos={amountOfActiveTodos}
            removeCompletedTodos={this.removeCompletedTodos}
          />
        )}
      </section>
    );
  }
}

export default App;
