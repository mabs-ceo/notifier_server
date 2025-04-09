const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');   
const dotenv = require('dotenv');
dotenv.config();
const User = require('../models/user.model');
const passport = require('passport');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('Inside Google Strategy:', profile); // Log the profile object for debugging
        // Check if the user has already logged in with Google
        // Check if user already exists in the database
        let user = await Provider.findOne({ email: profile._json.email });
        if (user) {
            done(null, user); // User found, proceed with the existing user
        } else {
            // Create a new user if not found
            user = await new User({
                email: profile._json.email,
                firstName: profile._json.given_name,
                googleId: profile.id,
                username: profile.displayName,
                thumbnail: profile._json.picture,
            }).save();
            done(null, user); // New user created, proceed with the new user
        }
    } catch (error) {
        console.error(error);
        done(error, null); // Handle any errors that occur during the process
    }
}));


passport.serializeUser((user, done) => {
    console.log('Inside serializeUser:', user); // Log the user object for debugging
    // Check if user is an instance of mongoose Document
    done(null, user.id); // Serialize the user ID to store in the session
}
);
passport.deserializeUser((id, done) => {
    console.log('Inside deserializeUser:', id); // Log the user ID for debugging
    // Find the user by ID in the database
    User.findById(id).then(user => {
        done(null, user); // Deserialize the user by ID to retrieve user information
    });
}); 

module.exports = passport;
// This code sets up Google OAuth 2.0 authentication using Passport.js and Mongoose for MongoDB.