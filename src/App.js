import React from 'react';
import TodoList from './components/todoList/TodoList';
import Footer from './components/footer/Footer';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todoList: [],
      id: 1,
      title: '',
      selectedPage: 'All',
    };
  }

  onInputChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  addTodo = (event) => {
    const newItem = {
      id: this.state.id,
      title: this.state.title,
      completed: false,
    };

    if (event.key === 'Enter') {
      event.preventDefault();
      event.target.value = '';

      this.setState(prevState => ({
        ...prevState,
        todoList: [...prevState.todoList, newItem],
        id: prevState.id + 1,
        title: '',
        allTodos: this.state.todoList,
    }))};
  }

  removeTodo = (todoId) => {
    const newTodoList = [...this.state.todoList];

    for (const todo of newTodoList) {
      if (todo.id === todoId) {
        const removedItem = newTodoList.indexOf(todo);
        newTodoList.splice(removedItem, 1);
      }
    };

    this.setState({
      todoList: newTodoList,
    });
  }

  changeCompleted = (event) => {
    const todoId = +event.target.id;

    this.setState(prevState => ({
      ...prevState,
      todoList: prevState.todoList.map(todo => {
        if (todoId === todo.id) {
          return {
            ...todo, completed: !todo.completed
          };
        }

        return todo;
      })
    }));
  }

  todosFilter = (event) => {
    let page = event.target.innerText;

    this.setState({
      selectedPage: page,
    });
  }

  markAllAsComplete = () => {
    this.setState(prevState => ({
      ...prevState,
      todoList: prevState.todoList.map(todo => {
        if (prevState.todoList.every(item => item.completed)) {
          return {...todo, completed: false}
        }

        return {...todo, completed: true}
      })
    }));
  }

  clearCompleted = () => {
    this.setState(prevState => ({
      ...prevState,
      todoList: prevState.todoList.filter(todo => !todo.completed)
    }));
  }

  render() {
    const { todoList, selectedPage } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onKeyDown={this.addTodo}
            onChange={this.onInputChange}
          />
        </header>

        <TodoList
          todoList={todoList}
          removeTodo={this.removeTodo}
          changeCompleted={this.changeCompleted}
          selectedPage={selectedPage}
          markAllAsComplete={this.markAllAsComplete}
        />

        <Footer
          todoList={todoList}
          selectedPage={selectedPage}
          todosFilter={this.todosFilter}
          clearCompleted={this.clearCompleted}
        />
      </section>
    );
  }
}

export default App;
