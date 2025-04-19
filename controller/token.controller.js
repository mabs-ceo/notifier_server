const Token = require("../models/token.model");

async function subscribe(req, res) {
  

    try {
        const { token,timeSpend ,honeypotValue} = req.body;
     
        if (!token ) {
            return res.status(400).json({ status:'failed',code:400, message: 'Token is required' });
        }
      
        if(honeypotValue && honeypotValue.trim() !== ''){
            return res.status(403).json({status:'failed',code:403 ,message:'Bot detected (honeypot triggered)'});
        }
      
        if(timeSpend < 3){
            return res.status(403).json({status:'failed',code:403 ,message:'Bot detected (too fast)'});
        }
      
   
        const existingToken = await Token.findOne({ token });
        if (existingToken) {
          
            return res.status(201).json({status:'OK',code:201, message: 'Token already exists' });
        }
    const tokenCreated= await Token.create({ token ,subscribedFor:'janaza' });
    
        // Save the token to the database or perform any necessary actions
        if(!tokenCreated) {
            return res.status(400).json({status:'failed',code:400,  message: 'Token not saved' });
        }
        res.status(200).json({status:'created',code:200,  message: 'Token saved successfully' });
    } catch (error) {
      
        res.status(500).json({status:'failed',code:500,  message: 'Error saving token', error });
    }
}

async function unSubscribe(req, res) {
    try {
        const { token } = req.body;
     
        if (!token) {
            return res.status(400).json({ status:'failed',code:400, message: 'Token is required' });
        }
        // Delete the token from the database or perform any necessary actions
        // For example, you can remove it from a database or invalidate it in a third-party service
      
        await Token.deleteOne({ token });
        res.status(200).json({ status:'OK',code:200, message: 'Token deleted successfully' });
    } catch (error) {
        console.error('Error deleting token:', error);
        res.status(500).json({ status:'failed',code:500, message: 'Error deleting token', error });
    }
}


module.exports = { subscribe, unSubscribe };