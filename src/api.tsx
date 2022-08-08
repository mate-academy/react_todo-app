/* eslint-disable no-console */

// this part is in development
export {};

export const getUserName = async (username: string) => {
  function createUser() {
    return fetch('https://mate.academy/students-api/users', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        username,
      }),
    })
      .then(res => res.json())
      .then(res => res.id);
  }

  return fetch(`https://mate.academy/students-api/users/${await createUser()}`)
    .then(res => res.json()
      .then(rese => rese.username));
};
