
const express=require("express")
const route=express.Router()


const services=require('../services/render')
const controller=require('../controller/userside/controller')
const middleware=require("../../middeleware/middeleware")

route.get("/",services.homeRoutes)

route.get("/login",services.loginRoutes)  
 
route.get("/register1",services.otpRoutes)  
 
route.get("/register2",services.otp2Routes)   

route.get("/register3",services.registrationRoutes)  
  
route.get("/forgotpassword1",services.forgot1Routes) 
  
route.get("/forgotpassword2",services.forgot2Routes)

route.get("/forgotpassword3",services.forgot3Routes)




   
// api create 
 

route.post('/api/',controller.create);

route.post('/api/login',controller.validation) 


// registration otp

 
route.post('/api/otp',controller.otp)

route.post('/api/otpverification',controller.otpverification)

 
 
//forgot otp  

route.post('/api/forgototp',controller.forgototp)

route.post('/api/forgototpverification',controller.forgototp2)

route.post('/api/updateforgototp',controller.updatepassword)
  


// admin router
 
// route.get('/adminlogin',adminservices.adminloginRoutes)
  

module.exports=route;

  