const express = require('express');

const server = express();

// your code here

const db = require('./data/accounts-model.js')

server.use(express.json());


server.get('/api/accounts', async (req, res) => {
    try{
        const accounts = await db.find(req.query);
        res.status(200).json(accounts);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'error retrieving the posts'
        });
    }
});

server.post('/api/accounts', async (req, res) => {
    const newAccount = req.body;
    if(newAccount){
        try {
            const account = await db.add(req.body);
            res.status(201).json(account);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'error adding account'
            });
        }
    } else {
        res.status(400).json({
            err: 'text property missing'
        });
    }   
});

module.exports = server;