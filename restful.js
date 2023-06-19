const express = require('express');
const mongoose = require('mongoose');

//Connect to MongoDB Atlas
mongoose.connect('mongodb://localhost:27017/DBName', { 
    useNewUrlParser: true, useUnifiedTopology: true 
});
//Connection status
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB Atlas');
});
mongoose.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB Atlas', err);
});

// Define the Visitor schema
const visitorSchema = new mongoose.Schema({
    name: String,
    idNumber: String,
    documentType: String,
    gender: String,
    birthDate: Date,
    age: Number,
    documentExpiry: Date,
    companyTelephoneNumber: String,
    vehicleNumber: String,
    category: String,
    ethnicity: String,
    passportNumber: String,
    photoAttributes: String,
});

// Define the Room schema
const roomSchema = new mongoose.Schema({
    checkInTime: Date,
    visitExpiryTime: Date,
    idNumber: String,
    roomNumber: String,
    passNumberAttributes: String,
});

// Define the Visitor Card schema
const visitorCardSchema = new mongoose.Schema({
    name: String,
    idNumber: String,
    photo: String,
    qrCode: String,
    passNumberAttributes: String,
});