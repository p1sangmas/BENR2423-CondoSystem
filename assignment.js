//mongoDB
const { MongoClient} = require("mongodb");
const uri = "mongodb://172.24.74.118:27017/"
const  client = new MongoClient(uri)
//express
const express = require('express')
var jwt = require('jsonwebtoken')
const app = express()
const port = 3000
//bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;
var hashed;
var checkpassword;

app.use(express.json());