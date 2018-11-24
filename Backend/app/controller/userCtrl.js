// External module import via NPM manager------------------------
var express = require('express');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var cron = require('node-cron');
const Binance = require('binance-api-node').default;
var Excel = require('exceljs');
var wb = new Excel.Workbook();
var path = require('path');
var filePath = path.resolve('sample.xlsx');

// Make instance 
function binanceInstance(apiKey,secretKey){
  const client = Binance({
    apiKey: apiKey,
    apiSecret: secretKey
  });
  return client;
}


// Modals and custome file import
var User = require('../models/userModel.js');
var Point = require('../models/point.js');
var CONST = require('../../config/constant');

// ----------------------------Registeration-------------------------------
/* Kunvar singh 24-11-2018
   Description : Register with mongodb using this API*/
// -----------------------------------------------------------

var registration = (req, res)=>{

      let Password = req.body.password;
      let Email = req.body.email;
      let confirmpassword = { confirmpassword : req.body.confirmpassword };
      var token;

      if(confirmpassword.confirmpassword == Password) {

            User.findOne({Email:Email},{},(err,data)=>{
              if(err){  res.json({ message : "Error occured on server!",status : 400, data : err}) }
                 
                 if(!data){
                   crypto.randomBytes(10,(err,buf)=>{
                     token = buf.toString('hex');
                     req.body.verificationToken = token;
                   });

                    bcrypt.hash(Password, 10, (err, hash)=> {
                      if (err) {
                          res.json({ message: "unable to bcrypt the password",status: 200 })
                        } 
                        else if (hash){
                              let requestObj = {
                                  UserName: req.body.username,
                                  Email : Email,
                                  Password: hash,
                                  };

                                  if(requestObj.UserName && requestObj.Email){
                                    User.create(requestObj,(err, data)=>{
                                      if (err) {
                                            console.log('errrrrrrrrrrrrrrrrrr', err);
                                             res.json({ message: "error, There is unable to store record in db",status: 400 })
                                           } else if (data) {
                                            requestObj.savePassword = Password;
                                              return res.json({message :"Your account created successfully!.",status : 200})
                                          }
                                        else return res.json({ message: "There are an error to get the data", status: 400 });
                                    });
                                  }
                                  else return res.json({ message : "Please enter the all required fields",status : 400 })
                        }
                         else return res.json({  message: "Password is unable to bcrypt the password" , status: 400 })
                });
              }
              else return res.json({message : "This email id is already register with us",status : 400});
             });
      }
      else return res.json({ message: "Password and confirmPassword not match", status :400});
    }

// ----------------------------Login-------------------------------
/* Kunvar singh 24-11-2018
   Description : Login with credential usign all the cases*/
// -----------------------------------------------------------
  var login = (req,res)=>{
          var reqObj = {
             Email : req.body.email,
             Password : req.body.password
          };

          if(reqObj.Email && reqObj.Password){
                      User.findOne({Email :req.body.email},{},function(err ,data){
                        if(err) return res.json({message : "Err, unable to get the data",err,status : 400})

                        if(data) {
                                bcrypt.compare(req.body.password,data.Password,function(err  ,success){
                                if(err) return res.json({message : "unable to campare the password",status : 400})
                                
                                else if(success){
                                   var token = jwt.sign({id:data._id},'secret',{ expiresIn: '1h' });
                                   return res.json({status :200, message : "User login successfully",auth : true,token : token , data : data })

                                   var userid =  function(req, res) {
                                                var token = req.headers['token'];
                                                jwt.verify(token, "name", function(err, decoded) {
                                                  if (err) return res.json(err);
                                                  return res.json(decoded);
                                                });
                                            }
                                 }
                                 else return res.json({ message : "Please enter the correct password ",status:400})
                               });
                           }
                           else return res.json({message : "Your email is not register with us, Please signup first!.",status : 400});
                      });
            }
            else return res.json({message : "Please enter email & password!.",status : 400})
   }


// --------------------------------------------START-----------------------------------------------
/* Description  : Charts data and get from MongoDB using aggreation
   Name : Kunvar Singh
   Date : 24th, Nov,2018*/
var chartResult = (req, res)=>{
    Point.aggregate(
   [{$group:
         {
           _id: { email: "$Email" },
           totalAmount: { $sum: "$points" },
           count: { $sum: 1 }
         }
     }
   ]
,(err,data)=>{
  console.log(data);
  return res.send({status : 200, result : data});
});
}
// --------------------------------------------END-----------------------------------------------



// --------------------------------------------START-----------------------------------------------
/* Description  : To save the points for users
   Name : Kunvar Singh
   Date : 24th, Nov,2018*/

var savePoint = (req, res)=>{
  var name = req.body.name;
  var email = req.body.email;
  var point = req.body.point;
  if(name && point && email){
    let obj = {
      UserName : name,
      Email : email,
      points : point
    }
    Point.create(obj,(err, saved)=>{
      if(err) return res.send({status:400, message :"unable to saved in DB"})
      return res.send({status:200, message :"Points saved!."})
    })
    
  }
  else{
   return res.send({status:400, message :"No data found!."})
  }
}
// --------------------------------------------END-----------------------------------------------



// --------------------------------------------START-----------------------------------------------
/* Description  : File system read data through excel sheet
   Name : Kunvar Singh
   Date : 24th, Nov,2018*/
var readExceldata = (req, res)=>{
    wb.xlsx.readFile(filePath).then(function(){
      var sh = wb.getWorksheet("Sheet1");
      // sh.getRow(1).getCell(2).value = 32; // We can manupulate field value like as
      wb.xlsx.writeFile("samplecopy.xlsx");
      // console.log(sh.rowCount); //For counting no of rows
      for (i = 1; i <= sh.rowCount; i++) {
          var points = sh.getRow(i).getCell(3).value;
          console.log(sh.getRow(i).getCell(1).value,sh.getRow(i).getCell(2).value,(parseInt(points)+CONST.wnsConstant.manupulationValue));
      }
  });
    return res.send({status:200,message : "File has been saved successfully"})
}
// --------------------------------------------END-----------------------------------------------



// --------------------------------------------START-----------------------------------------------
/* Description  : To start a schedule job in every 1 minute
   Name : Kunvar Singh
   Date : 24th, Nov,2018*/
var scheduleJob = (req, res)=>{
  var task =  cron.schedule('*/1 * * * *', async() => {
    console.log("i am a scheduling job started in every 1 min");
    getDataFromThirdParty();
  });
  return res.send({status:200, message:'Job has been started yet!.'});
}


// --------------------------------------------START-----------------------------------------------
/*KAUNVAR SINGH*/
// Calling third party api here
function getDataFromThirdParty(){
  return new Promise((resolve,reject)=>{
    var binance = binanceInstance("","");
        let accountFunds = binance.prices();
        accountFunds.then((sucess)=>{
          console.log("Going to updated in Koinfox DB",sucess);
          // save here in DB
        })
        .catch((error)=>{
          console.log("Error occured while fetching funds",error);
        });
  })
}
// --------------------------------------------END-----------------------------------------------


// Export function for access interact with DB
  exports.registration = registration;
  exports.login  = login;
  exports.chart1 = chartResult;
  exports.savePoint = savePoint;
  exports.readExceldata = readExceldata;
  exports.scheduleJob = scheduleJob;