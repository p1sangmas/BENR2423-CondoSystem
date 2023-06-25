//mongoDB
const {MongoClient} = require("mongodb");
const uri = "mongodb+srv://fakhrul:1235@clusterfakhrul.bigkwnk.mongodb.net/"
const client = new MongoClient(uri)
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


app.get('/viewVisitor', verifyToken, (req, res) => {
  if(req.house.role == 'admin'){
    //get all visitors from database
    find({ role: { $eq: req.visitor.role } })
  }

  if(req.house.role == 'owner'){
    //get own visitors from database
    find({house: { $eq: req.house._id } })
  }
  //res.send('Hello World!')
})

//login
app.post( '/login',async function (req, res) {
  let {name, password} = req.body
  //BCRYPT hash
  const salt = await bcrypt.genSalt(saltRounds)
  hashed = await bcrypt.hash(password, salt)
  console.log(hashed)
  //login(name,hashed)
  res.send(req.body)
  //Get the jwt token
    let user = login(name, password);
    res.send(generateToken(user))
})

//register
app.post( '/registerVisitor', (req, res) => {
  let data = req.body
  res.send(
    registerVisitor(
      data.role,
      data.name,
      data.idNumber,
      data.documentType,
      data.gender,
      data.birthDate,
      data.age,
      data.documentExpiry,
      data.company,
      data.TelephoneNumber,
      data.vehicleNumber,
      data.category,
      data.ethnicity,
      data.photoAttributes,
      data.passNumber                  
    )
  )
});

//change phone number
app.post('/changePhoneNumber', async function (req, res){
  const {savedidNumber, newphoneNumber} = req.body
  await changePhoneNumber(savedidNumber, newphoneNumber)
  res.send(req.body)
})
//delete visitor
app.post('/deleteVisitor', async function (req, res){
  const {name, idNumber} = req.body
  await deleteVisitor(name, idNumber)
  res.send(req.body)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

//////////FUNCTION//////////

//CREATE(createListing)
async function createListing(client, newListing){
  const result = await client.db("assignmentCondo").collection("visitor").insertOne(newListing);
  console.log(`New listing created with the following id: ${result.insertedId}`);
}
//READ(login)
async function login(name, hashed){
  await client.connect()
  const result = await client.db("assignmentCondo").collection("admin").findOne({ name: name });

  if (result) {
    //BCRYPT verify password
    bcrypt.compare(result.password, hashed, function(err, result){
      if(result == true){
        console.log("Access granted. Welcome")
      }else{
        console.log("Wrong password")
        console.log(result)
      }
    });
  } 
  else {
      console.log("Admin not registered")
  }
}
//CREATE(register)
async function registerVisitor(newrole, newname, newidNumber, newdocumentType, newgender, newbirthDate, 
                        newage, newdocumentExpiry, newcompany, newTelephoneNumber, newvehicleNumber,
                        newcategory, newethnicity, newphotoAttributes, newpassNumber){
  //TODO: Check if username exist
  await client.connect()
  const exist = await client.db("assignmentCondo").collection("visitor").findOne({name: newname})
  if(exist){
      console.log("Visitor has already registered")
  }else{
      await createListing(client,
        {
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
        }
      );
      console.log("Registered successfully!")
  }
} 
//UPDATE(change phone number)
async function changePhoneNumber(savedidNumber, newphoneNumber){
  await client.connect()
  const exist = await client.db("assignmentCondo").collection("admin").findOne({idNumber: savedidNumber})
  if(exist){
    await client.db("assignmentCondo").collection("admin").updateOne({idNumber: savedidNumber}, {$set: {phoneNumber: newphoneNumber}})
    console.log("Your phone number has changed successfuly.")
  }else{
    console.log("This admin does not exist.")
  }
}
//DELETE(delete visitor)
async function deleteVisitor(oldname, oldidNumber){
  await client.connect()
  const exist = await client.db("assignmentCondo").collection("visitor").findOne({name: oldname})
  if(exist){
    checkidNumber = await exist.idNumber;
    if(oldidNumber == checkidNumber){
      await client.db("assignmentCondo").collection("visitor").deleteOne({name: oldname})
      console.log("Visitor account deleted successfully.")
    }else{
      console.log("ID number is incorrect")
    }
  }else{
    console.log("Visitor does not exist.")
  }
}

//AUTHORIZATION(jwt token)
function generateToken(userProfile){
  return jwt.sign(
    userProfile,
    'SiapaCuriDiaBerdosa',  { expiresIn: 60 * 60 });
}
function verifyToken(req, res, next){
  let header = req.headers.authorization
  console.log(header)

  let token = header.split(' ')[1]

  jwt.verify(token, 'SiapaCuriDiaBerdosa', function(err, decoded) {
    if (err) {
      res.send("Invalid Token")
    }
    req.user = decoded

    next()
  });
}