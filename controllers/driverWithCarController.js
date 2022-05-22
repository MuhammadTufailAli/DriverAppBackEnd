const mongoose = require('mongoose')
const carOwner = mongoose.model('CarOwner')
const OwnerRequest = mongoose.model('CarOwnerRequest')
const driver = mongoose.model('Driver')
const  driverAttendance = mongoose.model('DriverAttendance')


// SIGN UP
const carOwnerSingup =  async (req, res) => {


    let userName = req.body.userName;
    console.log("incoming UserName : ",userName)
    console.log("incoming data for user Sign Up:",req.body)
    console.log("Incoming profile Picture File", req.file);



    
if(req.file){


        console.log("incoming profile picture name is:",req.file.originalname)

            const userData = new carOwner({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userName: req.body.userName,
                password: req.body.password,
                address: req.body.address,
                city: req.body.city,
                email: req.body.email,
                carTitle:req.body.carTitle,
                carModel:req.body.carModel,
                carRegCity:req.body.carRegCity,
                contactNumber:req.body.contactNumber,
                status:"new",
                profilePicture: "/carOwnersProfiles/"+req.file.filename

            })



            try  {
        
                let response = await userData.save();
                console.log(response);
                res.send({code: 0, message: 'Car Owner Registered Successfully' , data:response});
        
                }
            
            catch (e) {
                
                console.log('Error occured, possible cause: '+e.message);
                res.send({code: 1, error: 'Error occured, possible cause: '+e.message});
            }


    }

    else{


        const userData = new carOwner({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            password: req.body.password,
            address: req.body.address,
            city: req.body.city,
            email: req.body.email,
            carTitle:req.body.carTitle,
            carModel:req.body.carModel,
            carRegCity:req.body.carRegCity,
            status:"new",
            contactNumber:req.body.contactNumber,
            profilePicture: req.body.picture
        })




        try  {
        
            let response = await userData.save();
            console.log(response);
            res.send({code: 0, message: 'User Registered Successfully' , data:response});
    
            }
        
        catch (e) {
            
            console.log('Error occured, possible cause: '+e.message);
            res.send({code: 1, error: 'Error occured, possible cause: '+e.message});
        }


    }


    
}



// LOGIN
const carOwnerLogin = async function (req,res){

    console.log("incoming car Owner user name", req.body.userName);
    console.log("incoming car Owner password", req.body.password);


    try {
        
        let response = await carOwner.findOne({userName: req.body.userName});



        if(response && response.password === req.body.password && response.status != 'blocked'  && response.status !='new'){
            console.log("Login successful")
            res.send({code: 0, message: 'Car Owner login successful',data:response});  
          

        }
       else if(response===null){
        res.send({code: -1, error:"Car Owner  account not found"});

       }

       else if(response.status === 'blocked'){
        res.send({code: -2, error:"Car Owner  account has been blocked"});
       }

       else if(response.status === 'new'){
        res.send({code: -3, error:"Car Owner account yet needs an appproval of Admin"});
       }
       
       else{
        res.send({code: 1, error:"Wrong Password"});

       }

    } catch (e) {
        console.log("Login failed")
        res.send({code: 1, error: 'Error occured, possible cause: '+e.message});
    }

   


}


// UPDATE 
const carOwnerUpdate =  async (req, res) => {

    let userName = req.body.userName;
    console.log("incoming UserName for user update:",userName)
    console.log("incoming data for user update:",req.body)
    console.log("Incoming profile Picture File", req.file);



    let userData = {};

    
    if(req.file){
        userData.profilePicture = "/profiles/"+req.file.filename;
        console.log("incoming profile picture name is:",req.file.originalname)
    }

    if(req.body.firstName){
        userData.firstName = req.body.firstName;
    }

    if(req.body.lastName){
        userData.lastName = req.body.lastName;
    }

    if(req.body.password){
        userData.password = req.body.password;
    }

    if(req.body.address){
        userData.address = req.body.address;
    }
   
    if(req.body.city){
        userData.city = req.body.city;
    }

    if(req.body.email){
        userData.email= req.body.email;
    }

    if(req.body.status){
        userData.status= req.body.status;
    }

    if(req.body.contactNumber){
        userData.contactNumber= req.body.contactNumber;
    }
    if(req.body.carTitle){
        userData.carTitle= req.body.carTitle;
    }
    if(req.body.carModel){
        userData.carModel= req.body.carModel;
    }
    if(req.body.carRegCity){
        userData.carRegCity = req.body.carRegCity;
    }


        userData.lastModified = new Date();

        try  {
            let response = await carOwner.updateOne({userName:userName}, userData);
            console.log(response);
            res.send({code: 0,data:response});
        
            }
        
        catch (e) {
            
            console.log('Error occured, possible cause: '+e.message);
            res.send({code: 1, error: 'Error occured, possible cause: '+e.message});
        }
        

    
}
//----------------------------------------------------------------------------------



// RETRIVE 
const carOwnerRetrive =  async (req, res) => {


    try  {
        const response = await carOwner.findOne({userName:req.query.userName});
        console.log("Car Owner retrive response ",response);
        res.send({code: 0,data:response});
    
        }
    
    catch (e) {
        
        console.log('Error occured, possible cause: '+e.message);
        res.send({code: 1, error: 'Error occured, possible cause: '+e.message});
    }
    

}



// CREATE REQUEST
const carOwnerRequest =  async (req, res) => {

    let carOwnerUserName = req.body.carOwnerUserName;
    console.log("incoming  Car Owner UserName : ",carOwnerUserName)
    


            const userData = new OwnerRequest({
                carOwnerUserName: req.body.carOwnerUserName,
                driverUserName: req.body.driverUserName,
                carOwnerName: req.body.carOwnerName,
                jobSpan: req.body.jobSpan,
                amountOffered: req.body.amountOffered,
                city: req.body.city,
                carTitle: req.body.carTitle,
                carModel:req.body.carModel,
                carRegCity:req.body.carRegCity,
                profilePicture:req.body.profilePicture,
                status:'new',
              
            })



            try  {
        
                let response = await userData.save();
                console.log(response);
                res.send({code: 0, message: 'Request Created Successfully' , data:response});
        
                }
            
            catch (e) {
                
                console.log('Error occured, possible cause: '+e.message);
                res.send({code: 1, error: 'Error occured, possible cause: '+e.message});
            }


}

// DRIVER BOOKING CANCEL
const bookingCancel =  async (req, res) => {

    const reqId = req.query.reqId;


    data = {}
    data.status = "expired"

    try {

        const mainReq = await OwnerRequest.updateOne({_id:reqId},data)
        res.send({code:0,data:mainReq,message:"Booking Canceled"})
        
    } catch (e) {

        console.log('Error occured, possible cause: '+e.message);
        res.send({code: 1, error: 'Error occured, possible cause: '+e.message});
        
    }
 

}



// RETRIVE ALL DRIVERS THAT ARE NOT BLOCKED ,BOOKED, NEW
const viewAllDrivers =  async (req, res) => {

    const carOwnerUserName = req.query.userName

    try  {
        const  allreadyBooked = await OwnerRequest.find({carOwnerUserName:carOwnerUserName,status:"accepted"});
       
        if(allreadyBooked.length > 0){
            console.log("Car Owner already has a deal signed up");
            res.send({code: 1,message:"You have Already Hired a driver.You cannot hire more than one driver at a time ",data:[]});
        }
        else{
            const response = await driver.find({status:{$nin:['new','blocked','booked']}});
            console.log("Car Owner retrive response ",response);
            res.send({code: 0,data:response});

        }
      
    
        }
    
    catch (e) {
        
        console.log('Error occured, possible cause: '+e.message);
        res.send({code: -1, error: 'Error occured, possible cause: '+e.message});
    }
    

}


// RETRIVE THE HIRED DRIVER
const hiredDriver =  async (req, res) => {

        
    const carOwnerUserName = req.query.carOwnerUserName

    try  {

        const matchingRequest = await OwnerRequest.findOne({carOwnerUserName:carOwnerUserName,status:{$nin:['new','expired']}})
        if(!matchingRequest){

            res.send({code: 1,data:[],message:"You have not hired any Driver Yet"});

        }
        else{

            const driverUserName = matchingRequest.driverUserName
            const hireDate = matchingRequest.createdDate
            const hirePrice = matchingRequest.amountOffered
            const reqId = matchingRequest._id;
            const driverDetails = await driver.findOne({userName:driverUserName})
    
            const data = {
    
                hirePrice:hirePrice,
                hireDate:hireDate,
                reqId:reqId
    
            };
    
            const driverData = {
    
    
                firstName: driverDetails.firstName,
                lastName: driverDetails.lastName,
                userName: driverDetails.userName,
                cnic: driverDetails.cnic,
                licenseNumber :driverDetails.licenseNumber,
                address: driverDetails.address,
                city: driverDetails.city,
                email: driverDetails.email,
                contactNumber: driverDetails.contactNumber,
    
    
            }
    
    
            console.log("Found Driver Name",driverUserName);
            console.log("Found Driver Details ",driverDetails);
            
            res.send({code: 0,data:data,driverDetails:driverData});
        
            }


        }
    
    catch (e) {
        
        console.log('Error occured, possible cause: '+e.message);
        res.send({code: -1, error: 'Error occured, possible cause: '+e.message});
    }
    

}



// DRIVER ATTENDANCE REQUEST VIEW
const driverRequestView =  async (req, res) => {

    
    const reqId  = req.query.reqId;


    try  {

        const response = await driverAttendance.find({reqId:reqId,status:"new"})

        if(response && response.length >0){
         res.send({code: 0,data:response});
    
        }
        else{
            res.send({code: 1,data:response,message:"No new attendace requests"});
        }
    }
    
    catch (e) {
        
        console.log('Error occured, possible cause: '+e.message);
        res.send({code: -1, error: 'Error occured, possible cause: '+e.message});
    }
    

}


// DRIVER ATTENDANCE ACTION
const driverAttendanceAction =  async (req, res) => {

    const id = req.body.id;
    const action = req.body.status;
    console.log("incoming id for attendace action is :",id)
    try  {

        if(action === 'accepted'){

            var data = {};
            data.status = "accepted"
    
            console.log("currently shared req status:",data)
    
            const matchingReq = await driverAttendance.updateOne({_id:id},data)
            console.log("macthing request is for update is ",matchingReq)
            res.send({code:0,data:matchingReq,message:"Attendace marked successfully"})
    

        }
        else if(action === 'rejected'){
    
    
            var data = {};
            data.status = "rejected"
    
            console.log("currently shared req status:",data)
    
    
            const matchingReq = await driverAttendance.updateOne({_id:id},data)
            res.send({code:0,data:matchingReq,message:"Attendace Rejected"})
    
    
        }
    

        }
    
    catch (e) {
        
        console.log('Error occured, possible cause: '+e.message);
        res.send({code: 1, error: 'Error occured, possible cause: '+e.message});
    }
    

}


// DRIVER ATTENDANCE RECORD
const driverAttendanceHistory =  async (req, res) => {

    const reqId = req.query.reqId;
 
    try  {

            const response = await driverAttendance.find({reqId:reqId,status:'accepted'}).sort({createdDate:-1});
            const count = await driverAttendance.find({reqId:reqId,status:'accepted'}).count();
            const matchingRequest = await OwnerRequest.findOne({_id:reqId,status:{$nin:['new','expired']}})
            console.log("incoming request Id:",reqId)
            console.log("The matching amout offered found:",matchingRequest)
            const daySalary = matchingRequest.amountOffered
            const accumulativeSalary = daySalary * count
            res.send({code:0,data:response,salary:accumulativeSalary,message:"Record Fetched Successfully"})
    

        }
       
    
    catch (e) {
        
        console.log('Error occured, possible cause: '+e.message);
        res.send({code: 1, error: 'Error occured, possible cause: '+e.message});
    }
    

}



// SEARCH FITERS
const searchFilter =  async (req, res) => {

    const city =  req.body.city;
    const age = req.body.age
    const  expectedSalary = req.body.expectedSalary


        try{

            if(city && age && expectedSalary){
                console.log("inside first condition")

                const response = await driver.find({city:city,age:age,expectedSalary:expectedSalary,status:{$nin:['blocked','booked']}})
                res.send({code:0,data:response})
            }
        
            else if (city && age ){

                const response = await driver.find({city,age,status:{$nin:['blocked','booked']}})
                res.send({code:0,data:response})
        
            }
        
            else if (age && expectedSalary ){

                const response = await driver.find({age,expectedSalary,status:{$nin:['blocked','booked']}})
                res.send({code:0,data:response})
        
                
            }
        
            else if (city && expectedSalary ){

                const response = await driver.find({city,expectedSalary,status:{$nin:['blocked','booked']}})
                res.send({code:0,data:response})
        
                
            }
        
            else if (city){
        
                const response = await driver.find({city,status:{$nin:['blocked','booked']}})
                res.send({code:0,data:response})
        
            }
        
            else if (age){

                const response = await driver.find({age,status:{$nin:['blocked','booked']}})
                res.send({code:0,data:response})
        
        
            }
        
            else if (expectedSalary){

                const response = await driver.find({expectedSalary,status:{$nin:['blocked','booked']}})
                res.send({code:0,data:response})
        
        
            }
            
        

        }

  

        catch (e) {
        
        console.log('Error occured, possible cause: '+e.message);
        res.send({code: -1, error: 'Error occured, possible cause: '+e.message})
        
        }
                
    

}




module.exports = {carOwnerSingup,carOwnerLogin,carOwnerRetrive,carOwnerUpdate,carOwnerRequest,viewAllDrivers,hiredDriver,driverRequestView,driverAttendanceAction,driverAttendanceHistory,bookingCancel,searchFilter}