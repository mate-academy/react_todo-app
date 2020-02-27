import React, { PureComponent } from 'react';
import { v4 } from 'uuid';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

const todos = [
  {
    id: v4().substr(0, 4),
    label: 'drink a coffee',
    completed: false,
  },
  {
    id: v4().substr(0, 4),
    label: 'get the world masters',
    completed: false,
  },
  {
    id: v4().substr(0, 4),
    label: 'find myself',
    completed: false,
  },
  {
    id: v4().substr(0, 4),
    label: 'make somebody happy',
    completed: false,
  },
];

export class App extends PureComponent {
  state = {
    todoList: todos,
    isSorted: false,
    sortedTodos: [],
  };

  componentDidMount() {
    if (localStorage.getItem('todos')) {
      this.setState(prevState => ({
        todoList: [
          ...JSON.parse(localStorage.getItem('todos')),
        ],
      }));
    }
  }

  componentDidUpdate() {
    localStorage.setItem('todos', JSON.stringify(this.state.todoList));
  }

  createTodo = todo => ({
    id: v4().substr(0, 4),
    label: todo,
    completed: false,
  });

  setNewTodo = (todo) => {
    const createdTodo = this.createTodo(todo);

    if (createdTodo.label.trim()) {
      this.setState(prevState => ({
        todoList: [
          ...prevState.todoList,
          createdTodo,
        ],
      }));
    }
  };

  handleCompleted = (event) => {
    const { todoList } = this.state;
    const isComplete = event.target.checked;
    const todoId = event.target.id;

    const changedItem = todoList
      .find(todo => todo.id === todoId);

    changedItem.completed = isComplete;

    this.setState(prevState => ({
      todoList: [
        ...prevState.todoList
          .slice(0, todoList.indexOf(changedItem)),
        changedItem,
        ...prevState.todoList
          .slice(todoList.indexOf(changedItem) + 1),
      ],
    }));
  };

  handleDestroy = (event) => {
    const { todoList } = this.state;
    const { name } = event.target;

    const deletingItem = todoList
      .find(todo => todo.id === name);

    this.setState(prevState => ({
      todoList: [
        ...prevState.todoList
          .slice(0, todoList.indexOf(deletingItem)),
        ...prevState.todoList
          .slice(todoList.indexOf(deletingItem) + 1),
      ],
    }));
  };

  setEditedValue = (value, idx) => {
    const { todoList } = this.state;

    const changedItem = todoList
      .find(todo => todo.id === idx);

    if (value.trim()) {
      changedItem.label = value;
      changedItem.completed = false;

      this.setState(prevState => ({
        todoList: [
          ...prevState.todoList
            .slice(0, todoList.indexOf(changedItem)),
          changedItem,
          ...prevState.todoList
            .slice(todoList.indexOf(changedItem) + 1),
        ],
      }));
    }
  };

  handleSelectAll = (isSelectAll) => {
    const allTodosCompleted = list => (list
      .map(todo => ({
        ...todo,
        completed: isSelectAll,
      })));

    this.setState(prevState => ({
      todoList: allTodosCompleted(prevState.todoList),
    }));
  };

  clearCompleted = () => {
    const { todoList } = this.state;

    const newTodos = todoList.filter(todo => !todo.completed);

    this.setState({
      todoList: newTodos,
    });
  };

  handleSort = (name) => {
    this.setState((prevState) => {
      if (name === 'active') {
        return {
          isSorted: true,
          sortedTodos: prevState.todoList
            .filter(todo => !todo.completed),
        };
      }

      if (name === 'completed') {
        return {
          isSorted: true,
          sortedTodos: prevState.todoList
            .filter(todo => todo.completed),
        };
      }

      return {
        isSorted: false,
        todoList: prevState.todoList,
        sortedTodos: [],
      };
    });
  };

  render() {
    const { todoList, isSorted, sortedTodos } = this.state;

    return (
      <section className="todoapp">
        <Header
          setNewTodo={todo => this.setNewTodo(todo)}
          selectAll={checked => this.handleSelectAll(checked)}
        />

        <section className="main">
          <TodoList
            setEditedValue={(value, id) => this.setEditedValue(value, id)}
            data={isSorted ? sortedTodos : todoList}
            onCompleted={event => this.handleCompleted(event)}
            onDestroy={event => this.handleDestroy(event)}
          />
        </section>

        <Footer
          clear={this.clearCompleted}
          length={isSorted
            ? sortedTodos.length
            : todoList.length
          }
          sort={name => this.handleSort(name)}
        />
      </section>
    );
  }
}
