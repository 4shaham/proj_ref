

var Userdb=require("../../model/User schema")
var otpdb=require("../../model/otp.schema")
const bcrypt = require('bcrypt');
const nodemailer=require("nodemailer")
const Mailgen=require("mailgen")


const otpGenrator = () => {
   return `${Math.floor(1000 + Math.random() * 9000)}`;  
 };
 
 const sendOtpMail = async (req, res) => {
   const otp = otpGenrator();
 
   const transporter = nodemailer.createTransport({
     service: "gmail",
     auth: {
       user: process.env.AUTH_EMAIL,
       pass: process.env.AUTH_PASS,
     },
   });
 
   const MailGenerator = new Mailgen({
     theme: "default",
     product: {
       name: "Gocart",
       link: "https://mailgen.js/"
     },
   });
 
   const response = {  
     body: {
       name: req.session.user,
       intro: "Your OTP for Gocart verification is:",
       table: {
         data: [  
           {
             OTP: otp,
           },
         ],
       },
       outro: "Looking forward to doing more business",
     },
   }; 
 
   const mail = MailGenerator.generate(response);
 
   const message = {
     from: process.env.AUTH_EMAIL,
     to: req.session.user,
     subject: "Gocart OTP Verification",
     html: mail,
   };
  
   try {
     const newOtp = new otpdb({
       email:req.session.user,
       otp: otp,
       createdAt: Date.now(),
       expiresAt: Date.now() + 60000,
     });
     const data = await newOtp.save();
     req.session.otpTd=data._id;
     res.status(200).redirect("/register2");
     await transporter.sendMail(message);
   } catch (error) {
     console.log(error);
   }
 };

 

//create and save new user
  
exports.create=async(req,res)=>{
    if(!req.body){
       res.status(400).send({message:"hi you entered any thing"})
       return   
    }
    if (req.body.password !== req.body.confirmPassword) {
        res.status(400).send({ message: "Passwords do not match" });
        return;
    }
   
   //  const existingUser = await Userdb.findOne({ email: req.body.email });

   //  if (existingUser) {
   //      res.status(400).send({ message: "Email is already taken" });
   //      return;
   //  }


  // hashed password  

//  const hashedPassword = await bcrypt.hash(req.body.password, 10);

 // for send mail 
//  const sendVerifyMail=async(name,email, user_id)=>{

//    try{
//     const transporter = nodemailer.createTransport({
//       host : 'smtp.gmail.com',
//       port:587,
//       secure:false,
//       requireTLS:true,
//       auth:{
//          user :'shaham123@gmail.com',
//          password:''
//       }
//     });

//     const mailOptions ={
//       from :'shaham123@gmail.com',
//       to : email,
//       subject :'for Verfication mail',
//       // html:'<p>hi '+name+', please click here to <a href="http://127.0.0.1:3000/verify?id='user_id+'"> verify </a> your mail.</p>'
//       html:'<p>hi '+name+', please click here to <a href="http://127.0.0.1:3000/verify?id=' + user_id + '"> verify </a> your mail.</p>'
//     }
//     transporter.sendMail(mailOptions,(error,info)=>{
//          if(error){
//             console.log(error)
//          }else{
//             console.log("Email has benn sent:-",info.response);
//          }
//        })
//    } catch(error){
//       console.log(error.message)
//    }
//  }
  
 const user=new Userdb({ 
    name:req.body.name,
    email:req.session.user,
    password:req.body.password,
 })

 // save user in bd

 user
 .save(user)    
 .then(data=>{
    res.redirect("/login")  
 })  
 .catch(err=>{
    res.status(400).send({
        message:err.message||"some error occured while creating option "
    });
 });
    
}        

// login verification  

exports.validation=async(req,res)=>{
   // if(!req.body){ 
   //    res.status(400).send({message:"hi you entered any thing"})
   //    return   
   // }

  //  const userhashedPassword = await bcrypt.hash(req.body.password, 10);
   const a={
      email:req.body.email,
      password: req.body.password
   }

  //  const {name,password}=req.body
   console.log(a) 

   const foundUser = await Userdb.findOne({ email:a.email });

   
   
   if (!foundUser) {
     res.status(401).send({ message: 'User not found' });
     return;
   }  
   console.log(foundUser)
   console.log(a.password)
  //  const isPasswordMatch = await bcrypt.compare(a.password, foundUser.password);
   if(foundUser.email===a.email && foundUser.password==a.password ){
      res.send("hi")
   }else{
      
    res.status(401).send({ message: 'password error' });  
   }
  
  
}


//registraion otp



exports.otp=(req,res)=>{
  
   if(!req.body){
      res.status(400).send({message:"hi you entered any thing"})
       return  
   }
   req.session.user=req.body.email
   
   sendOtpMail(req,res);  

   

}




//authentication

exports.otpverification=async(req,res)=>{
   if(!req.body){
      res.status(400).send({message:"hi you entered any thing"})
       return  
   }
   const otpUser = await otpdb.findOne({ _id: req.session.otpTd});     

    const b=req.body.otp

   if(b==otpUser.otp){
      res.redirect("/register3")
   }else{
      res.send("otp failed");
   }

}




const forgototpsendOtpMail = async (req, res) => {
  const otp = otpGenrator();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS,
    },
  });

  const MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Gocart",
      link: "https://mailgen.js/"
    },
  });

  const response = {  
    body: {
      name:  req.session.forgotuser,
      intro: "Your OTP for Gocart verification is:",
      table: {
        data: [
          {
            OTP: otp,
          },
        ],
      },
      outro: "Looking forward to doing more business",
    },
  }; 

  const mail = MailGenerator.generate(response);

  const message = {
    from: process.env.AUTH_EMAIL,
    to:   req.session.forgotuser,
    subject: "Gocart OTP Verification",
    html: mail,
  };
 
  try {
    const newOtp = new otpdb({
      email: req.session.forgotuser,
      otp: otp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 60000,
    });
    const data = await newOtp.save();
    req.session.forgototpTd=data._id;
    res.status(200).redirect("/forgotpassword2");
    await transporter.sendMail(message);
  } catch (error) {
    console.log(error);
  }
};



// forgot otp   



exports.forgototp=async(req,res)=>{
  
  if(!req.body){  
     res.status(400).send({message:"hi you entered any thing"})
      return  
  }   
  req.session.forgotuser = req.body.email
  
  const forgotuserb = await Userdb.findOne({  email:req.session.forgotuser });

  if(!forgotuserb){
    console.log(" the mail")
    return 
  }   



  forgototpsendOtpMail(req,res);

  

}


// verification otp

exports.forgototp2=async(req,res)=>{

   if(!req.body){ 
    return
   }
   
  const forgototpUser = await otpdb.findOne({ _id: req.session.forgototpTd});  
  console.log(forgototpUser)

  if(forgototpUser.otp==req.body.otp){
    res.redirect("/forgotpassword3")
  }else{
    res.send("error")
  }
}


//update password

exports.updatepassword=async(req,res)=>{
  console.log("hi")


  //  if(!req.body){
  //   console.log("hi")
  //   return 
  //  }
  //  if(!req.body.password==req.body.confirmPassword){
  //   console.log("hill")
  //   return
  //  } 
  if (  ! req.body ) {
    console.log("Error: Request body is missing");
    // You might want to send an error response to the client
    return res.status(400).json({ error: "Request body is missing" });
}

const { password, confirmPassword } = req.body;

if (!(password === confirmPassword)) {
    console.log("Error: Passwords do not match");
    // You might want to send an error response to the client
    return res.status(400).json({ error: "Passwords do not match" });
}

   //hased password 

  //  const hashedPassword = await bcrypt.hash(req.body.password, 10);

   console.log( req.session.forgotuser)
                  
   

  const updateuser=await Userdb.updateOne({ email:  req.session.forgotuser},{$set:{password:req.body.password}});
  console.log(updateuser)
  
  //  await Userdb.updateOne({ email:  req.session.forgotuser},{$set:{password:hashedPassword}})

  //  const uu= await Userdb.findOne({ email:  req.session.forgotuser})

  res.redirect("/login")     
        

}    

  