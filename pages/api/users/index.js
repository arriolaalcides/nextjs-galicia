let clients = require('../../modulo/data/data.json');

export default async function handler(req, res) {

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    return res.json(clients);
}