require('dotenv').config();
const jwt = require('jsonwebtoken');
// const token_key = process.env.TOKEN_SECRET;

createSecretToken = (id) => {
    const createToken = jwt.sign({id}, process.env.TOKEN_SECRET ,{
        expiresIn: 3 * 24 * 60 * 60
    });
    return createToken;
};

module.exports = { createSecretToken };