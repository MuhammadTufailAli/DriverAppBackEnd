const mongoose = require('mongoose')
const Driver = mongoose.model('Driver')
const OwnerRequest = mongoose.model('CarOwnerRequest')
const driverAttendance = mongoose.model('DriverAttendance')
const carOwner = mongoose.model('CarOwner')



//////////////////////////////////// GET LOCAL DATE FUNCTION /////////////////////////////////

function convertUTCDateToLocalDate(date) {
    console.log('Date', date);
    console.log('Timezone', date.getTimezoneOffset());
    console.log('Time', date.getTime());

    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
    var offset = date.getTimezoneOffset() / 60; // = -5
    var hours = date.getHours(); // = 12

    newDate.setHours(hours - offset);

    return newDate;   
}

//--------------------------------------------------------------------------------------------





// SIGN UP
const driverSingup =  async (req, res) => {


    let userName = req.body.userName;
    console.log("incoming UserName : ",userName)
    console.log("incoming data for Driver Sign Up:",req.body)
    console.log("Incoming profile Picture File", req.file);



    
if(req.file){


        console.log("incoming profile picture name is:",req.file.originalname)

            const userData = new Driver({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                cnic:req.body.cnic,
                licenseNumber:licenseNumber,
                userName: req.body.userName,
                password: req.body.password,
                address: req.body.address,
                city: req.body.city,
                age:req.body.age,
                expectedSalary:req.body.expectedSalary,
                email: req.body.email,
                contactNumber:req.body.contactNumber,
                status:"new",
                profilePicture: "/profiles"+req.file.filename

            })



            try  {
        
                let response = await userData.save();
                console.log(response);
                res.send({code: 0, message: 'Driver Registered Successfully' , data:response});
        
                }
            
            catch (e) {
                
                console.log('Error occured, possible cause: '+e.message);
                res.send({code: 1, error: 'Error occured, possible cause: '+e.message});
            }


    }

    else{


        const userData = new Driver({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            cnic:req.body.cnic,
            licenseNumber:req.body.licenseNumber,
            userName: req.body.userName,
            password: req.body.password,
            address: req.body.address,
            city: req.body.city,
            age:req.body.age,
            expectedSalary:req.body.expectedSalary,
            email: req.body.email,
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
const driverLogin = async function (req,res){

    console.log("incoming Driver user name", req.body.userName);
    console.log("incoming Driver password", req.body.password);


    try {
        
        let response = await Driver.findOne({userName: req.body.userName});


        if(response && response.password === req.body.password && response.status != 'blocked'  && response.status !='new'){
            console.log("Login successful")
            res.send({code: 0, message: 'Driver login successful',data:response});  
          

        }
       else if(response===null){
        res.send({code: -1, error:"Driver  account not found"});

       }

       else if(response.status === 'blocked'){
        res.send({code: -2, error:"Driver account has been blocked"});
       }

       else if(response.status === 'new'){
        res.send({code: -3, error:"Driver account yet needs an appproval of Admin"});
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
const driverUpdate =  async (req, res) => {

    let userName = req.body.userName;
    console.log("incoming UserName for Driver update:",userName)
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
        userData.status = req.body.status;
    }

    if(req.body.contactNumber){
        userData.contactNumber= req.body.contactNumber;
    }
    if(req.body.licenseNumber){
        userData.licenseNumber= req.body.licenseNumber;
    }
    if(req.body.cnic){
        userData.cnic= req.body.cnic;
    }
    if(req.body.expectedSalary){
        userData.expectedSalary= req.body.expectedSalary;
    }
    if(req.body.age){
        userData.age= req.body.age;
    }


   
        userData.lastModified = new Date();


        try  {
            let response = await Driver.updateOne({userName:userName}, userData);
            console.log(response);
            res.send({code: 0,data:response});
        
            }
        
        catch (e) {
            
            console.log('Error occured, possible cause: '+e.message);
            res.send({code: 1, error: 'Error occured, possible cause: '+e.message});
        }
        

    
}


// RETRIVE 
const driverRetrive =  async (req, res) => {


    try  {
        const response = await Driver.find({userName:req.query.userName});
        console.log("Car Owner retrive response ",response);
        res.send({code: 0,data:response});
    
        }
    
    catch (e) {
        
        console.log('Error occured, possible cause: '+e.message);
        res.send({code: 1, error: 'Error occured, possible cause: '+e.message});
    }
    

}


// CHECK ALL THE AVAILABLE CAR OWNERS REQUESTS
const driverViewAllReq =  async (req, res) => {

        const driverUserName = req.query.driverUserName

    try  {

        const  allreadyBooked = await OwnerRequest.find({driverUserName:driverUserName,status:"accepted"});
        console.log("allready booked response:",allreadyBooked)
        if(allreadyBooked.length > 0 ){
            console.log("Driver already has a deal signed up");
            res.send({code: 1,message:"You have Already Hired by a carOwner",data:[]});
        }
        else{

            const response = await OwnerRequest.find({driverUserName:driverUserName,status:"new"});
            console.log("Car Owner retrive response ",response);
            res.send({code: 0,data:response});

        }

      
        }
    
    catch (e) {
        
        console.log('Error occured, possible cause: '+e.message);
        res.send({code: -1, error: 'Error occured, possible cause: '+e.message});
    }
    

}




// REQUEST ACTION (ACCEPT OR REJECT)
const requestAction =  async (req, res) => {

    const id = req.body.id;
    const reqStatus = req.body.status;
    const driverUserName = req.body.driverUserName


    if(reqStatus === 'accepted'){

        try  {

            reqData = {
                status : req.body.status
            };

            driveData = {

                status: 'booked'
            }

            carOwnerData = {

                status: 'booked'
            }

            const reqResponse = await OwnerRequest.updateOne({_id:id},reqData)
            const driverBooked = await Driver.updateOne({userName:driverUserName},driveData)
            const matchingReq = await OwnerRequest.findOne({_id:id})
            const carOwnerUserName = matchingReq.carOwnerUserName;
            const carOwner = await carOwner.updateOne({userName:carOwnerUserName},carOwnerData)
    
                console.log("Request Accept Response",reqResponse)
                console.log("Driver Booked Response",driverBooked)
                res.send({code: 0,message:"Request Accepted",driverResponse:driverBooked,requestResponse:reqResponse,carOwnerResponse:carOwner})
        
            }
        
        catch (e) {
            
            console.log('Error occured, possible cause: '+e.message);
            res.send({code: 1, error: 'Error occured, possible cause: '+e.message});
        }


    }


    else if (reqStatus === 'rejected'){


        try  {

            const response = await OwnerRequest.deleteOne({_id:id});
            console.log("Driver Request deleted response",response);
            res.send({code: 0,data:response,message:"Request Rejected"});
        
            }
        
        catch (e) {
            
            console.log('Error occured, possible cause: '+e.message);
            res.send({code: 1, error: 'Error occured, possible cause: '+e.message});
        }


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



// RETRIVE THE OWNER INFROMATION WHO HIRED DRIVER
const hireBY =  async (req, res) => {

        
    const driverUserName = req.query.driverUserName

    try  {

        const matchingRequest = await OwnerRequest.findOne({driverUserName:driverUserName,status:{$nin:['new','expired']}})
        if(!matchingRequest){

            res.send({code: 1,data:[],message:"You have not hired by any One Yet"});

        }
        else{

            const carOwnerUserName = matchingRequest.carOwnerUserName
            const hireDate = matchingRequest.createdDate
            const hirePrice = matchingRequest.amountOffered
            const reqId = matchingRequest._id;
            const carOwnerDetails = await carOwner.findOne({userName:carOwnerUserName})
            console.log("found Car Owner user Name:", carOwnerUserName)
            console.log("Found Car Owner Name",carOwnerUserName);
            console.log("Found Car Owner Details ",carOwnerDetails);
            
            const Additionaldata = {
    
                hirePrice:hirePrice,
                hireDate:hireDate,
                reqId:reqId
    
            };
    
            const carOwnerData = {
    
    
                firstName: carOwnerDetails.firstName,
                lastName: carOwnerDetails.lastName,
                userName: carOwnerDetails.userName,
                address: carOwnerDetails.address,
                city: carOwnerDetails.city,
                email: carOwnerDetails.email,
                carTitle: carOwnerDetails.carTitle,
                carModel: carOwnerDetails.carModel,
                carRegCity: carOwnerDetails.carRegCity,
                contactNumber: carOwnerDetails.contactNumber
    
    
            };
    
            console.log("car owner data to be sent is :",carOwnerData)
    
            
            res.send({code: 0,data:Additionaldata,carOwnerDetails:carOwnerData});


        }
  
    
        }
    
    catch (e) {
        
        console.log('Error occured, possible cause: '+e.message);
        res.send({code: -1, error: 'Error occured, possible cause: '+e.message});
    }
    

}




// ATTENDANCE REQUEST
const attendanceRequest =  async (req, res) => {

    const reqId =  req.body.reqId;
    const carOwnerUserName = req.body.carOwnerUserName
    const driverUserName = req.body.driverUserName

    console.log("incoming req id for attendance req:",reqId)

    date = convertUTCDateToLocalDate(new Date());

    let today = new Date();
    today.setHours(0,0,0,0);

    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

        
    console.log("CURRENT DATE  WAS SET TO :",date);
    console.log("TODAY DATE  WAS SET TO :",today);
    console.log("TOMORROW DATE WAS SET TO :", tomorrow);

    
            try {

                         let exist = await driverAttendance.findOne({reqId:reqId ,createdDate:{$gte: new Date(today), $lt: new Date(tomorrow)}});
                
                        if(!exist){

                            const driverRequest =  new driverAttendance({

                                reqId:reqId,
                                carOwnerUserName: carOwnerUserName,
                                driverUserName:driverUserName,
                                status:"new",
                                fuelExpense:0,
                                maintenanceExpense:0,
                                fuleSlip:"N/A",
                                maintenanceSlip:'N/A'
                        
                                 })
            
                                const response = await driverRequest.save()
                                
                                res.send({code: 0,data:response,message:"Driver Request Created Successfully"})
                            
                        }
                           
                        else{
                            console.log('User Alread added in the active list');
                            res.send({code: 1, error:"Addentance is already marked for today" });
                        }
                
                } 
                catch (e) {
                
                console.log('Error occured, possible cause: '+e.message);
                res.send({code: -1, error: 'Error occured, possible cause: '+e.message})
                
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


// DRIVER ATTENDANCE RECORD
const addExpense =  async (req, res) => {


  
    
     const id = req.body.id
     const amountOffered = req.body.amountOffered
     const fuelExpense = req.body.fuelExpense
     const maintenanceExpense = req.body.maintenanceExpense
     const file = req.files.filename
     const fuelFile = req.files.fuelFile.filename


    


    if(!req.files){

        let data = {}

         if(fuelExpense){
             data.fuelExpense = fuelExpense
         }
         if(maintenanceExpense){
             data.maintenanceExpense = maintenanceExpense
         }

        
            try  {
                console.log("Incoming id for update expense is :",id)
                

                const response = await driverAttendance.updateOne({_id:id},data)    
                res.send({code:0,data:response,message:"Infomation added successfully"})

            }
        
    
            catch (e) {
                
                console.log('Error occured, possible cause: '+e.message);
                res.send({code: -1, error: 'Error occured, possible cause: '+e.message});
            }



       

    }
    else{

        let data = {}

        if(amountOffered){
            data.amountOffered = amountOffered;
    
         }
         if(fuelExpense){
             data.fuelExpense = fuelExpense
         }
         if(maintenanceExpense){
             data.maintenanceExpense = maintenanceExpense
         }
         if(req.file){
            data.fuelExpense = "/expense"+fuelFile
         }
         if(req.fuelfile){
             data.maintenanceExpense = "/expense"+file
         }


         
         try  {
            console.log("Incoming id for update expense is :",id)
            const response = await driverAttendance.updateOne({_id:id},data)    
            res.send({code:0,data:response,message:"Infomation added successfully"})

        }
    

        catch (e) {
            
            console.log('Error occured, possible cause: '+e.message);
            res.send({code: -1, error: 'Error occured, possible cause: '+e.message});
        }

         

    }
    

   

}


// DRIVER SEARCH FITERS
const searchFilter =  async (req, res) => {

    const userName = req.body.userName
    const city =  req.body.city;
    const amountOffered = req.body.amountOffered
    const  jobSpan = req.body. jobSpan


        try{

            if(city && amountOffered && jobSpan){

                const response = await OwnerRequest.find({city,amountOffered,jobSpan,driverUserName:userName,status:"new"})
                res.send({code:0,data:response})
            }
        
            else if (city && amountOffered ){

                const response = await OwnerRequest.find({city,amountOffered,driverUserName:userName,status:"new"})
                res.send({code:0,data:response})
        
            }
        
            else if (amountOffered && jobSpan ){

                const response = await OwnerRequest.find({amountOffered,jobSpan,driverUserName:userName,status:"new"})
                res.send({code:0,data:response})
        
                
            }
        
            else if (city && jobSpan ){

                const response = await OwnerRequest.find({city,jobSpan,driverUserName:userName,status:"new"})
                res.send({code:0,data:response})
        
                
            }
        
            else if (city){
        
                const response = await OwnerRequest.find({city,driverUserName:userName,status:"new"})
                res.send({code:0,data:response})
        
            }
        
            else if (amountOffered){

                const response = await OwnerRequest.find({amountOffered,driverUserName:userName,status:"new"})
                res.send({code:0,data:response})
        
        
            }
        
            else if (jobSpan){

                const response = await OwnerRequest.find({jobSpan,driverUserName:userName,status:'new'})
                res.send({code:0,data:response})
        
        
            }
            
        

        }

  

        catch (e) {
        
        console.log('Error occured, possible cause: '+e.message);
        res.send({code: -1, error: 'Error occured, possible cause: '+e.message})
        
        }
                
    

}





module.exports = {driverSingup,driverLogin,driverUpdate,driverRetrive,requestAction,attendanceRequest,hireBY,driverViewAllReq,driverAttendanceHistory,addExpense,bookingCancel,searchFilter}