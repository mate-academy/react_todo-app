import React from 'react';
import TodoList from './TodoList';
import TodoHeader from './TodoHeader';
import TodoFooter from './TodoFooter';

class App extends React.Component {
  state = {
    todoList: [],
    originalTodoList: [],
    idCounter: 0,
    filterIdentifier: 'all',
  };

  handleAddTodo = (title) => {
    this.setState(prevState => ({
      originalTodoList: [
        ...prevState.originalTodoList,
        {
          id: prevState.idCounter + 1,
          title,
          isCompleted: false,
        },
      ],

      idCounter: prevState.idCounter + 1,
    }));

    this.filterTodoList();
  };

  filterTodoList = () => {
    this.setState((prevState) => {
      const { filterIdentifier, originalTodoList } = prevState;

      switch (filterIdentifier) {
        case 'active':
          return ({
            todoList: originalTodoList.filter(todo => !todo.isCompleted),
          });
        case 'completed':
          return ({
            todoList: originalTodoList.filter(todo => todo.isCompleted),
          });
        default:
          return ({
            todoList: [...originalTodoList],
          });
      }
    });
  };

  toggleAllTodosCompleted = () => {
    this.setState(prevState => ({
      originalTodoList: prevState.originalTodoList.map(todo => ({
        ...todo,
        isCompleted: prevState.originalTodoList.some(t => !t.isCompleted),
      })),
    }));

    this.filterTodoList();
  };

  toggleTodoCompleted = (id) => {
    this.setState(prevState => ({
      originalTodoList: prevState.originalTodoList.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        }

        return todo;
      }),
    }));

    this.filterTodoList();
  };

  deleteTodo = (id) => {
    this.setState(prevState => ({
      originalTodoList: prevState.originalTodoList
        .filter(todoItem => todoItem.id !== id),
    }));

    this.filterTodoList();
  };

  toggleFilterIdentifier = (identifier) => {
    this.setState({
      filterIdentifier: identifier,
    });

    this.filterTodoList();
  };

  removeCompletedTodos = () => {
    this.setState(prevState => ({
      originalTodoList: prevState.originalTodoList
        .filter(todoItem => !todoItem.isCompleted),
    }));

    this.filterTodoList();
  };

  render() {
    const {
      todoList,
      originalTodoList,
      filterIdentifier,
    } = this.state;
    const amountOfActiveTodos = originalTodoList
      .filter(todo => !todo.isCompleted).length;

    return (
      <section className="todoapp">
        <TodoHeader addTodo={this.handleAddTodo} />

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={this.state.todoList.every(todo => todo.isCompleted)}
            onClick={this.toggleAllTodosCompleted}
          />
          {originalTodoList.length > 0 && (
            <label htmlFor="toggle-all">Mark all as complete</label>
          )}
          <TodoList
            todos={todoList}
            handleCheck={this.toggleTodoCompleted}
            handleDelete={this.deleteTodo}
          />
        </section>

        {(originalTodoList.length > 0) && (
          <TodoFooter
            todos={todoList}
            amountOfActiveTodos={amountOfActiveTodos}
            filterIdentifier={filterIdentifier}
            toggleFilterIdentifier={this.toggleFilterIdentifier}
            removeCompletedTodos={this.removeCompletedTodos}
          />
        )}
      </section>
    );
  }
}

export default App;
