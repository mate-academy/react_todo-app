Cypress.Commands.add('createDefaultTodos', function () {
  const todos = {
    toDoItemOne: 'buy some cheese',
    toDoItemTwo: 'feed the cat',
    toDoItemThree: 'book a doctor`s appointment'
  };

  cy.getByDataCy('createTodo')
    .type(`${todos.toDoItemOne}{enter}`)
    .type(`${todos.toDoItemTwo}{enter}`)
    .type(`${todos.toDoItemThree}{enter}`);

  cy.get('[data-cy="todosList"]')
    .children()
    .then(() => {
    });
});

const page = {
  checkTodo() {
    cy.get('@todos')
      .eq(0)
      .find('[type="checkbox"]')
      .check();
  },

  clickButton(name) {
      cy.contains(name)
      .click();
  },

  assertTodo(key, value, index) {
    cy.get('@todos')
      .eq(index)
      .should(key, value);
  },

  assertTodosList(key, value) {
    cy.get('@todos')
      .should(key, value);
  }
}

describe('Page', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.createDefaultTodos()
      .as('todos');
  });

  it('should store todos in "localStorage" with "id", "title", "completed" values', () => {
    const todos = window.localStorage.getItem('todos');
    const obj = JSON.parse(todos);

    expect(obj[0]).to.includes.keys('id', 'title', 'completed');
    expect(obj[0].completed).to.eq(false);
  });

  it('should show the number of not completed todos left', () => {
    page.checkTodo();

    cy.getByDataCy('todosCounter')
      .should('contain', 2);
  });

  it('should have an option to complete a todo', () => {
    page.checkTodo();

    page.assertTodo('have.class', 'completed', 0);
  });

  it('should have an option to toggle the completed status of all the todos', () => {
    cy.getByDataCy('toggleAll')
      .check();

    cy.get('@todos')
      .children()
      .each(() => {
        page.assertTodo('have.class', 'completed', 0);
      });

    cy.getByDataCy('toggleAll')
      .uncheck();

    cy.get('@todos')
      .children()
      .each(() => {
        page.assertTodo('not.have.class', 'completed', 0);
      });
  });

  it('should have an option to switch between `all`/`active`/`completed` todos', () => {
    page.checkTodo();

    page.clickButton('Active');

    page.assertTodosList('have.length', 2)

    page.clickButton('Completed');

    page.assertTodosList('have.length', 1);

    page.clickButton('All');

    page.assertTodosList('have.length', 3);
  });

  it('should have an option to delete todos', () => {
    cy.get('@todos')
      .eq(0)
      .find('[data-cy="deleteTodo"]')
      .click({ force: true });

    page.assertTodosList('have.length', 2);
  });

  it('should have an option to clear the completed todos', () => {
    cy.contains('Clear completed')
      .should('not.exist');

    page.checkTodo();

    page.clickButton('Clear completed');

    page.assertTodosList('have.length', 2);
  });

  it('should show only input on the page when there are no todos', () => {
    cy.getByDataCy('toggleAll')
      .check();

    page.clickButton('Active');

    cy.getByDataCy('todosList')
      .should('exist');

    cy.getByDataCy('todosFilter')
      .should('be.visible');

    page.clickButton('All');

    page.clickButton('Clear completed');

    cy.getByDataCy('todosList')
      .should('not.exist');

    cy.getByDataCy('todosFilter')
      .should('not.exist');
  });

  it('user can edit todos', () => {
    cy.get('@todos')
      .eq(0)
      .dblclick()
      .type('!{enter}');

    page.assertTodo('contain', 'buy some cheese!', 0);

    cy.get('@todos')
      .eq(1)
      .dblclick()
      .type('!{esc}');

    page.assertTodo('contain', 'feed the cat', 1);

    cy.get('@todos')
      .eq(2)
      .dblclick();

    cy.get('@todos')
      .eq(2)
      .find('input.edit')
      .clear()
      .type('{enter}');

    cy.get('@todos')
      .contains('book a doctor`s appointment')
      .should('not.exist');
  });
});
