const { addUser } = require("../database/tables/user");
const authRouter = require("express").Router();
const express = require('express');
const { verifyLoginDetails } = require("../services/authMethod");
const { printError, printSuccess } = require("../services/coloredPrint");

authRouter.use(express.urlencoded({ extended: false }))

authRouter.post('/register', async (req,res) => {
    try{
        await addUser(req.body);
        printSuccess("Successfully Registered");
        res.status(200).send("registered");
    }catch(error){
        printError(error.message);
        res.status(400).send(error.message);
    }
});

authRouter.post('/login', async (req,res) => {
    try{
        await verifyLoginDetails(req.body.email,req.body.password);
        printSuccess("Logged In Successfully");
        res.status(200).send("logged in");
    }catch(error){
        printError(error.message);
        res.status(404).send(error.message);
    }
})

module.exports = authRouter;