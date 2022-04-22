Cypress.Commands.add('createDefaultTodos', function () {
  const toDoItemOne = 'buy some cheese';
  const toDoItemTwo = 'feed the cat';
  const toDoItemThree = 'book a doctor`s appointment';

  cy.getByDataCy('createTodo')
    .type(`${toDoItemOne}{enter}`)
    .type(`${toDoItemTwo}{enter}`)
    .type(`${toDoItemThree}{enter}`)

  cy.get('[data-cy="todosList"]')
    .children()
    .then(() => {
    });
})

describe('Page', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.createDefaultTodos()
      .as('todos');
  });

  it('todo element has "id", "title", "completed" values', () => {
    const todos = window.localStorage.getItem('todos');
    const obj = JSON.parse(todos);

    expect(obj[0]).to.includes.keys('id', 'title', 'completed');
    expect(obj[0].completed).to.eq(false);
  });

  it('the number of not completed todos is shown', () => {
    cy.get('@todos')
      .eq(0)
      .find('[type="checkbox"]')
      .check();

    cy.getByDataCy('todosCounter')
      .should('contain', 2);
  });

  it('a todo can be completed', () => {
    cy.get('@todos')
      .eq(0)
      .find('[type="checkbox"]')
      .check();

    cy.get('@todos')
      .eq(0)
      .should('have.class', 'completed');
  });

  it('Add ability to toggle the completed status of all the todos', () => {
    cy.getByDataCy('toggleAll')
      .check();

    cy.get('@todos')
      .children()
      .each(() => {
        cy.get('@todos')
          .should('have.class', 'completed')
      });

    cy.getByDataCy('toggleAll')
      .uncheck();

    cy.get('@todos')
      .children()
      .each(() => {
        cy.get('@todos')
          .should('not.have.class', 'completed')
      });
  });

  it('user can switch between `all`/`active`/`completed` todos', () => {
    cy.get('@todos')
      .eq(0)
      .find('[type="checkbox"]')
      .check();

    cy.get('button')
      .contains('Active')
      .click();

    cy.get('@todos')
      .should('have.length', 2);

    cy.get('button')
      .contains('Completed')
      .click();

    cy.get('@todos')
      .should('have.length', 1);

    cy.get('button')
      .contains('All')
      .click();

    cy.get('@todos')
      .should('have.length', 3);
  });

  it('user can delete todos', () => {
    cy.get('@todos')
      .eq(0)
      .find('[data-cy="deleteTodo"]')
      .click({ force: true });

    cy.get('@todos')
      .should('have.length', 2);
  });

  it('user can clear the completed todos', () => {
    cy.contains('Clear completed')
      .should('not.exist');

    cy.get('@todos')
      .eq(0)
      .find('[type="checkbox"]')
      .check();

    cy.get('button')
      .contains('Clear completed')
      .click();

    cy.get('@todos')
      .should('have.length', 2);
  });

  it('only input should be visible on the page when there are no todos', () => {
    cy.getByDataCy('todosList').children().each(() => {
      cy.get('@todos')
        .find('[type="checkbox"]')
        .check({ multiple: true })
    });

    cy.get('button')
      .contains('Active')
      .click();

    cy.getByDataCy('todosList')
      .should('exist');

    cy.getByDataCy('todosFilter')
      .should('be.visible');

    cy.get('button')
      .contains('All')
      .click();

    cy.get('button')
      .contains('Clear completed')
      .click();

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

    cy.get('@todos')
      .eq(0)
      .should('contain', 'buy some cheese!');

    cy.get('@todos')
      .eq(1)
      .dblclick()
      .type('!{esc}');

    cy.get('@todos')
      .eq(1)
      .should('contain', 'feed the cat');

    cy.get('@todos')
      .eq(2)
      .dblclick();

    cy.get('@todos')
      .eq(2).find('#editTodo').clear().type('{enter}');

    cy.get('@todos')
      .contains('book a doctor`s appointment')
      .should('not.exist');
  });
});
