'use strict';

async function getUsersWithRoles() {
    const users = await getUsers();
    const roles = await getRoles();
    return users.map(user => {
        user.role = roles.find(({ id }) => id === user.roleId);
        return user;
    });
  }

  getUsersWithRoles().then(console.log);

  function getUsers() {
    return Promise.resolve([
      { id: 'edfsdf', name: 'Kevin', roleId: 'dfjs7s' },
      { id: 'aicgst', name: 'Joe', roleId: 'usbd6ks' }
    ]);
  }

  function getRoles() {
    return Promise.resolve([
      { id: 'dfjs7s', name: 'admin' },
      { id: 'usbd6ks', name: 'manager' }
    ]);
  }