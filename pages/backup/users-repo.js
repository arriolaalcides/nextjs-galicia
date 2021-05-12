//const fs = require('fs');

let users = require('../modulo/data/data.json');

export const usersRepo = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

function getAll() {
    return users;
}

function getById(dni,clave) {
    return users.find(x => x.dni.toString() === dni.toString());
}

function create({ dni, clave, saldo }) {
    const user = { dni, clave, saldo };

    // validate
    if (users.find(x => x.dni === user.dni))
        throw `User with the dni ${user.dni} already exists`;

    // generate new user id
    user.clave = users.length ? Math.max(...users.map(x => x.clave)) + 1 : 1;

    // set date created and updated
    user.dateCreated = new Date().toISOString();
    user.dateUpdated = new Date().toISOString();

    // add and save user
    users.push(user);
    saveData();
}

function update(dni,clave, { saldo}) {
    const params = { dni, clave, saldo };
    const user = users.find(x => x.dni.toString() === dni.toString());

    // validate
    if (params.clave !== user.clave && users.find(x => x.clave === params.clave))
        throw `User with the clave ${params.clave} already exists`;

    // update and save
    Object.assign(user, params);
    saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(dni) {
    // filter out deleted user and save
    users = users.filter(x => x.dni.toString() !== dni.toString());
    saveData();
    
}

// private helper functions

function saveData() {
    //fs.writeFileSync('data/users.json', JSON.stringify(users, null, 4));
}