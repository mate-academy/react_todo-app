import React from 'react';
import TodoApp from './TodoApp';

import Footer from './Footer';
import filterFieldCaching from './filterFieldCaching';
import TodoList from './TodoList';

class App extends React.Component {
  state = {
    todos: [],
    sortFieldEvent: 'all',
    isCompletedHide: 0,
    statusAllTodo: true,
  }

  addTodo = (title) => {
    this.setState((prevState) => {
      const todosAdd = [...prevState.todos,
        {
          title,
          id: Date.now(),
          completed: false,
        },
      ];

      return {
        todos: todosAdd,
      };
    });
  };

  handleFilterBy = (field) => {
    this.setState({
      sortFieldEvent: field,
    });
  }

  handleToggle = (id) => {
    this.setState((prevState) => {
      const task = prevState.todos.find(todo => todo.id === id);
      task.completed = !task.completed;

      if (task.completed) {
        return {
          isCompletedHide: 1,
        };
      }

      return {
        todos: prevState.todos,
      };
    });
  }

  handleChackAll = () => {
    this.setState((prevState) => {
      const todoChakAll = prevState.todos.map(todo => ({
        ...todo,
        completed: prevState.statusAllTodo,
      }
      ));

      return {
        todos: todoChakAll,
        isCompletedHide: 1,
        statusAllTodo: !prevState.statusAllTodo,
      };
    });
  }

  deleteTodo = (id) => {
    this.setState((prevState) => {
      const todosDelet = prevState.todos.filter(todo => todo.id !== id);

      return {
        todos: todosDelet,
      };
    });
  }

  destroyAllComplete = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(a => !a.completed),
    }));
  }

  render() {
    const { todos, sortFieldEvent, isCompletedHide } = this.state;
    const todosVisible = filterFieldCaching(todos, sortFieldEvent);

    return (
      <section className="todoapp">
        <TodoApp
          onSubmit={this.addTodo}
        />

        <TodoList
          toggle={this.handleToggle}
          deleteTodo={this.deleteTodo}
          handleChackAll={this.handleChackAll}
          todos={todosVisible}
        />
        <Footer
          sortField={sortFieldEvent}
          handleFilterBy={this.handleFilterBy}
          todos={todosVisible}
          isCompletedHide={isCompletedHide}
          destroyAllComplete={this.destroyAllComplete}
        />
      </section>
    );
  }
}

export default App;
