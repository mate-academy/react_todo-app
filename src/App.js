import React from 'react';
import TodoApp from './TodoApp';

import Footer from './Footer';
import getSortFied from './getSortFied';
import TodoList from './TodoList';

class App extends React.Component {
  state = {
    todosVisible: [],
    todos: [],
    sortFieldEvent: 'all',
    sortField: 'all',
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
        todosVisible: getSortFied(todosAdd, prevState.sortField),
        todos: todosAdd,
      };
    });
  };

  handleFilterBy = (sortField) => {
    this.setState(prevState => ({
      sortFieldEvent: sortField,
      todosVisible: getSortFied(prevState.todos, sortField),
      sortField,
    }));
  }

  handleToggle = (id) => {
    this.setState((prevState) => {
      const task = prevState.todosVisible
        .find(todo => todo.id === id
          && { ...todo, completed: !prevState.completed });

      if (task.completed) {
        return {
          isCompletedHide: 1,
        };
      }

      return {
        todosVisible: prevState.todosVisible,
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
        todosVisible: getSortFied(todoChakAll, prevState.sortField),
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
        todosVisible: getSortFied(todosDelet, prevState.sortField),
      };
    });
  }

  destroyAllComplete = () => {
    this.setState((prevState) => {
      const todosActive = prevState.todosVisible.filter(a => !a.completed);
      return {
        todos: todosActive,
        todosVisible: getSortFied(todosActive, prevState.sortField),
      };
    });
  }

  render() {
    const { todosVisible, sortFieldEvent, isCompletedHide } = this.state;

    return (
      <section className="todoapp">
        <TodoApp
          onSubmit={this.addTodo}
        />

        <TodoList
          toggle={this.handleToggle}
          deleteTodo={this.deleteTodo}
          handleChackAll={this.handleChackAll}
          todosVisible={todosVisible}
        />
        <Footer
          sortField={sortFieldEvent}
          handleFilterBy={this.handleFilterBy}
          todosVisible={todosVisible}
          isCompletedHide={isCompletedHide}
          destroyAllComplete={this.destroyAllComplete}
        />
      </section>
    );
  }
}

export default App;
