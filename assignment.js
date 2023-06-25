const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://fakhrul:1235@clusterfakhrul.bigkwnk.mongodb.net/";
const client = new MongoClient(uri);

var jwt = require('jsonwebtoken');
const privatekey = "assalamualaikum";
var token;

const express = require('express');
const app = express();
const port = 3000; 

const bcrypt = require('bcrypt');
const saltround = 10;
var hashed;

app.use(express.json());

async function registerVisitor(newrole, newname, newidNumber, newdocumentType, newgender, newbirthDate, 
    newage, newdocumentExpiry, newcompany, newTelephoneNumber, newvehicleNumber,
    newcategory, newethnicity, newphotoAttributes, newpassNumber){
    await client.connect();
    const exist = await client.db("assignmentCondo").collection("visitor").findOne({name: newname});
    if(exist){
        console.log("Visitor already registered!");
    }else{
        await client.db("assignmentCondo").collection("visitor").insertOne({
            role: newrole,
            name: newname,
            idNumber: newidNumber,
            documentType: newdocumentType,
            gender: newgender,
            birthDate:newbirthDate,
            age: newage,
            documentExpiry: newdocumentExpiry,
            company: newcompany,
            TelephoneNumber: newTelephoneNumber,
            vehicleNumber: newvehicleNumber,
            category: newcategory,
            ethnicity: newethnicity,
            photoAttributes: newphotoAttributes,
            passNumber: newpassNumber 
        });
    }
}
    

async function login(name, password){
    await client.connect();
    const exist =await client.db("assignmentCondo").collection("admin").findOne({Name: name});
    console.log(exist.password);
    if(exist){
        if(await exist.password == password){
            console.log("Login Success!");
            token = jwt.sign({ Name: name, Role: exist.role }, privatekey);
            console.log(token);
        }else{
            console.log("Wrong password!");
        }
    }else{
        console.log("User doesn't exist!");
    }
}

app.post('/registerVisitor', async function(req, res){
    var token = req.header('Authorization').split(" ")[1];
    try {
        var decoded = jwt.verifyToken(token, privatekey);
        console.log(decoded.role)
      } catch(err) {
        console.log("Error!")
      }
    console.log(decoded);
    if (await decoded.role == "admin"){
        const {role, name, idNumber, documentType, gender, birthDate, 
            age, documentExpiry, company, TelephoneNumber, vehicleNumber,
            category, ethnicity, photoAttributes, passNumber} = req.body;
        await registerVisitor(role, name, idNumber, documentType, gender, birthDate, 
            age, documentExpiry, company, TelephoneNumber, vehicleNumber,
            category, ethnicity, photoAttributes, passNumber);
    }else{
        console.log("Access denied!")
    }
    
});

//login post function
app.post('/login', async function(req, res){
    const {name, password, role} = req.body;
    await login(name, password, role);
    
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
});

