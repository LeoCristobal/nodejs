const bcrypt = require('bcrypt');
const fsPromises = require('fs').promises;
const path = require('path');

const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

class RegisterController {
    async handleNewUser(req, res) {
        const { user, pwd } = req.body

        if (!user || !pwd) {
            return res.status(404).json({ message: 'USERNAME AND PASSWORD NEEDED' })
        }

        // check for duplication
        const duplication = await usersDB.users.find(person => person.username === user)

        if (duplication) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        try {
            const hashedPassword = await bcrypt.hash(pwd, 2);
            const newUser = { "username": user, "pwd": hashedPassword };
            usersDB.setUsers([...usersDB.users, newUser]);
            await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users))

            console.log(usersDB.users);
            res.status(201).json({ "message": `User: ${user} is created` })
            // res.json(usersDB.users)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    // show all users
    showUsers = (req, res) => {
        res.status(200).json(usersDB)
    }
}

module.exports = new RegisterController();