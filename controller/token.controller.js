const Token = require("../models/token.model");

async function subscribe(req, res) {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ message: 'Token is required' });
        }

        const existingToken = await Token.findOne({ token });
        if (existingToken) {
            return res.status(400).json({ message: 'Token already exists' });
        }
    const tokenCreated= await Token.create({ token ,subscribedFor:'janaza' });
        console.log('Token saved:', tokenCreated);
        // Save the token to the database or perform any necessary actions
        if(!tokenCreated) {
            return res.status(400).json({ message: 'Token not saved' });
        }
        res.status(200).json({ message: 'Token saved successfully' });
    } catch (error) {
        console.error('Error saving token:', error);
        res.status(500).json({ message: 'Error saving token', error });
    }
}

async function unSubscribe(req, res) {
    try {
        const { token } = req.body;
        console.log(token)
        if (!token) {
            return res.status(400).json({ message: 'Token is required' });
        }
        // Delete the token from the database or perform any necessary actions
        // For example, you can remove it from a database or invalidate it in a third-party service
        console.log('Deleting token:', token);
        await Token.deleteOne({ token });
        res.status(200).json({ message: 'Token deleted successfully' });
    } catch (error) {
        console.error('Error deleting token:', error);
        res.status(500).json({ message: 'Error deleting token', error });
    }
}


module.exports = { subscribe, unSubscribe };