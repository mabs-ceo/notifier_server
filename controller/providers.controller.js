const  Provider  = require('../models/providers.model');


async function RegisterProvider(req, res) {
    try {
        const { email, name, contact,providerUen,businessName } = req.body;
        if (!email || !name || !contact || !providerUen || !businessName) {
            // Check if all required fields are provided
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Check if the provider already exists
        const existingProvider = await Provider.findOne({ email });
        if (existingProvider) {
            return res.status(409).json({ message: 'Provider already exists' });
        }
        // Create a new provider
        const newProvider = new Provider({
            email,
            name,
            contact,
            providerUen,
            businessName
           
        });
        await newProvider.save();
        res.status(201).json(newProvider);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering provider', error });
    }
}

async function DeRegisterProvider(req, res) {
    try {
        const { providerId } = req.params;
        if (!providerId) {
            return res.status(400).json({ message: 'Provider ID is required' });
        }
        // Find the provider by ID and remove it
        const deletedProvider = await Provider.findByIdAndDelete(providerId);
        if (!deletedProvider) {
            return res.status(404).json({ message: 'Provider not found' });
        }
        res.status(200).json({ message: 'Provider deregistered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deregistering provider', error });
    }
}

module.exports = {RegisterProvider,DeRegisterProvider};