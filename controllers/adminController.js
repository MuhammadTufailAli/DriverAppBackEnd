const mongoose = require('mongoose')
const Admin = mongoose.model('Admin') 
const Driver = mongoose.model('Driver')
const carOwner = mongoose.model('CarOwner')


// ADMIN LOGIN AFTER VALIDATION PANEL
const adminLogin = async function (req,res){

    console.log("incoming admin user name", req.body.userName);
    console.log("incoming admin password", req.body.password);


    try {
        
        let response = await Admin.findOne({userName: req.body.userName});

        if(response && response.password === req.body.password){
            console.log("Login successful")
            res.send({code: 0, message: 'Admin login successful',data:response});  

        }
       else if(response===null){
        res.send({code: -1, error:"Admin  account not found"});

       }
       else{
        res.send({code: 1, error:"Wrong Password"});

       }

    } catch (e) {
        console.log("Login failed")
        res.send({code: 1, error: 'Error occured, possible cause: '+e.message});
    }

   


}


// ADMIN UPDATE PANEL  
const adminUpdate = async (req, res) => {


    let userName = req.body.userName;
    console.log("incoming UserName for Amin update:",userName)
    console.log("incoming request body:",req.body)


    let adminData = {};


    if(req.body.userName){
        adminData.userName = req.body.userName;
    }


    if(req.body.name){
        adminData.name = req.body.name;
    }


    if(req.body.password){
        adminData.password = req.body.password;
    }



    if(req.body.email){
        adminData.email= req.body.email;
    }

   
        try  {
            let response = await Admin.updateOne({}, adminData);
            console.log(response);
            res.send({code: 0,data:response});
        
            }
        
        catch (e) {
            
            console.log('Error occured, possible cause: '+e.message);
            res.send({code: 1, error: 'Error occured, possible cause: '+e.message});
        }
        
    
}


// ADMIN RETRIVE PANEL  
const adminRetrive =  async (req, res) => {


    try  {
        const response = await Admin.findOne({});
        console.log("admin retrive response ",response);
        res.send({code: 0,data:response});
    
        }
    
    catch (e) {
        
        console.log('Error occured, possible cause: '+e.message);
        res.send({code: 1, error: 'Error occured, possible cause: '+e.message});
    }
    

}



// ADMIN SIGN UP 
const adminSignUp = async (req, res) => {

                    
    const userData = new Admin({   
        name: "Usama Ali Zaib",
        userName: "admin",
        password: "admin",
        email: "usamaAliZaib@gmail.com",
        createdDate: new Date(),
      
    })


    try  {
    
        let response = await userData.save();
        console.log(response);
        res.send({code: 0, message: 'Admin Registered Successfully' , data:response});

        }
    
    catch (e) {
        
        console.log('Error occured, possible cause: '+e.message);
        res.send({code: 1, error: 'Error occured, possible cause: '+e.message});
    }

}


// ADMIN RETRIVE ALL DRIVERS
const driverRetriveAll =  async (req, res) => {


    try  {
        const response = await Driver.find({});
        res.send({code: 0,data:response});
    
        }
    
    catch (e) {
        
        console.log('Error occured, possible cause: '+e.message);
        res.send({code: 1, error: 'Error occured, possible cause: '+e.message});
    }
    

}


// ADMIN RETRIVE ALL CAR OWNERS
const carOwnerRetriveAll =  async (req, res) => {


    try  {
        const response = await carOwner.find({});
        res.send({code: 0,data:response});
    
        }
    
    catch (e) {
        
        console.log('Error occured, possible cause: '+e.message);
        res.send({code: 1, error: 'Error occured, possible cause: '+e.message});
    }
    

}


// carOwner Action  
const carOwnerAction =  async (req, res) => {

    const userName = req.body.userName
    let adminData = {};
    adminData.status = req.body.status

    try  {
        const response = await carOwner.updateOne({userName:userName},adminData);
        console.log("Car Owner retrive response ",response);
        res.send({code: 0,data:response});
    
        }
    
    catch (e) {
        
        console.log('Error occured, possible cause: '+e.message);
        res.send({code: 1, error: 'Error occured, possible cause: '+e.message});
    }
    

}


// Driver Action  
const driverAction =  async (req, res) => {

    const userName = req.body.userName
    console.log("imcoming userName",userName);
    console.log("imcoming status",req.body.status);

    let adminData = {};
    adminData.status = req.body.status
 
    try  {
        const response = await Driver.updateOne({userName},adminData);
        console.log("Car Owner retrive response ",response);
        res.send({code: 0,data:response});
    
        }
    
    catch (e) {
        
        console.log('Error occured, possible cause: '+e.message);
        res.send({code: 1, error: 'Error occured, possible cause: '+e.message});
    }
    

}



module.exports = {adminLogin,adminUpdate,adminRetrive,adminSignUp,carOwnerRetriveAll,driverRetriveAll,carOwnerAction,driverAction}