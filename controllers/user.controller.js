const fs = require('fs');
const path = require('path');


readDataFromFile = () => {
    let usersFile = fs.readFileSync(path.resolve("./", "users.json"), "utf-8");
    let users = JSON.parse(usersFile);
    return users;
}
exports.getAll = (req, res) => {


    let users = readDataFromFile();
    var offset = parseInt(req.query.offset, 10);
    var limit = parseInt(req.query.limit, 10);
    if (offset && limit) {
        users = users.slice(offset, offset + limit)
    }
    res.status(200).json(users);

}
exports.getOne = (req, res) => {
    let user = readDataFromFile().filter(user => user.id === parseInt(req.params.id));
    if (user.length > 0) {
        res.status(200).json(user[0]);
    }
    else {
        res.status(404).json({
            code: 404,
            message: 'Not found'
        });
    }
}

exports.addUser = (req, res) => {
    let u = req.body
    let users = readDataFromFile();
    let user = users.filter(user => user.id === parseInt(u.id));

    if (user.length > 0) {
        res.status(400).json({
            code: 400,
            message: `Id : ${u.id} already used.`
        });
    }
    else {
        users.push(u)
        fs.writeFileSync(path.resolve("./", "users.json"), JSON.stringify(users), 'utf-8');
        res.status(201).json({
            code: 201,
            message: 'Created.',
            user: u
        });
    }
}
exports.updateUser = (req, res) => {
    let users = readDataFromFile();
    let id = req.params.id
    let user = users.filter(user => user.id === parseInt(id));
    if (user.length > 0) {
        index = users.findIndex((user => user.id == parseInt(id)));
        let u = req.body
        u.id = parseInt(id)
        users[index] = u
        fs.writeFileSync(path.resolve("./", "users.json"), JSON.stringify(users), 'utf-8');
        res.status(200).json({
            code: 200,
            message: 'Updated.',
            user: u
        });
    }
    else {
        res.status(404).json({
            code: 404,
            message: 'Not found'
        });
    }
}
exports.deleteUser = (req, res) => {
    let users = readDataFromFile();
    let id = req.params.id
    let user = users.filter(user => user.id === parseInt(id));
    if (user.length > 0) {
        user = user[0]
        users.splice(users.indexOf(user), 1);
        fs.writeFileSync(path.resolve("./", "users.json"), JSON.stringify(users), 'utf-8');
        res.status(200).json({
            code: 200,
            message: 'Deleted.'
        });
    }
    else {
        res.status(404).json({
            code: 404,
            message: 'Not found'
        });
    }
}