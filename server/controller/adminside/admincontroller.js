const Product=require("../../model/product.schema")

const Cateogary=require("../../model/cateogary.schema")

exports.verification=(req,res)=>{


    const a={
        adminName:"shaham",
        adminPassword:"9995589030"
    }
  const {adminName,adminPassword}=a
    
    console.log(a.adminName)

    
    const b={
        name:req.body.name,
        password:req.body.password

    }

    const {name,password}=b
 
    if(name==adminName && password == adminPassword ){
        res.redirect("/admin/")
    }else{
        res.status(200)
    }

}

exports.addproduct=(req,res)=>{
     
    //  if(!req.body.pname){
    //   req.session.pname="the pname is required"
    //  }
    //  if(!req.body.bname){
    //   req.session.bname="the bname is required"
    //  }
    //  if(!req.body.category){
    //   req.session.category="the category is required"
    //  }
    //  if(!req.body.subtitle){
    //   req.session.subtitle="the subtitle is required"
    //  }
    //  if(!req.body.descriptionheading){
    //   req.session.descriptionheading="the descriptionheading is required"
    //  }
    //  if(!req.body.description){
    //   req.session.description="the description is required"
    //  }
    //  if(!req.body.firstprice){
    //   req.session.firstprice="the firstprice is required"
    //  }
    //  if(!req.body.lastprice){
    //   req.session.lastprice="the lastprice is required"
    //  }
    //  if(!req.body.discount){
    //   req.session.discount="the discount is required"
    //  }
    //  if(!req.body.color){
    //   req.session.color="the color is required"
    //  }
    //  if(!req.body.instock){
    //   req.session.instock="the instock is required"
    //  }
    //  if(!req.body.images){
    //   req.session.images="the images is required"
    //  }

    // if(req.session.pname||req.session.bname|| req.session.category||req.session.subtitle||req.session.descriptionheading|| req.session.description||req.session.firstprice|| req.session.lastprice||
    //   req.session.discount||req.session.color||req.session.instock||req.session.images){
    //     res.redirect("/admin/addproduct")  
    //  }
     console.log(req.body.pname +"this is body")

  const file=req.files
  const images=file.map((values)=>`/img/${values.filename}`);
  console.log(file);


 // save in db 
 const product=new Product({ 
    pname:req.body.pname,
    bname:req.body.bname,
    cateogary:req.body.category,
    subtitle:req.body.subtitle,
    descriptionheading:req.body.descriptionheading,
    description:req.body.description,
    firstprice:req.body.firstprice,    
    lastprice:req.body.lastprice,
    discount:req.body.discount, 
    color:req.body.color,
    instock:req.body.instock,    
    image:images
})

product 
  .save(product)    
  .then( data=>{
    console.log("correct")
    res.redirect("/admin/productManagment")  
 }) .catch(err=>{
    console.log("heloo")
    res.status(400).send({
        message:err.message||"some error occured while creating option "
    });  
 });
 
}   

exports.deleteproduct=async(req,res)=>{

  const deleteid=req.query.id
  console.log(deleteid);
  const d=await Product.updateOne({_id:deleteid},{$set:{status:false}})
  res.redirect("/admin/productManagment")
}

exports.findunlistproductaxios=async(req,res)=>{
   await Product.find({status:false})
   .then(product=>{
     res.send(product)
   }).catch(err=>{
    res.status(500).send({message:err.message})
  })
}

exports.recycleproduct=async(req,res)=>{
  const recycleid=req.query.id
  console.log(recycleid);
  await Product.updateOne({_id:recycleid},{$set:{status:true}})
  res.redirect("/admin/unlistproduct")
}



// axios  

exports.findproduct=async(req,res)=>{

    await Product.find({status:true}) 
      .then(product=>{   
        console.log(product)
        res.send(product)
      }).catch(err=>{
        res.status(500).send({message:err.message})
      })

}

exports.findeditproduct=async(req,res)=>{

 req.session.editid=req.query.id
console.log(req.session.editid)
       const data=await Product.findOne({_id:req.session.editid})
      .then(data=>{
        if(!data){
          res.status(404).send({message:`dcannot  user with ${id}.may be not user found`})
        }else{
          res.send(data)
        }
      }).catch(   err=>{
        res.status(500).send({message:err.message})
      })

}   


exports.editproduct=async(req,res)=>{
  const file=req.files
  const images=file.map((values)=>values.filename);  
 
const editid=req.session.editid
console.log(req.body.pname);
await Product.UpdateOne({_id:editid},{$set:{   
  pname:req.body.pname,
  bname:req.body.bname,
  cateogary:req.body.category,
  subtitle:req.body.subtitle,
  descriptionheading:req.body.descriptionheading,
  description:req.body.description,
  firstprice:req.body.firstprice,    
  lastprice:req.body.lastprice,
  discount:req.body.discount, 
  color:req.body.color,
  instock:req.body.instock,    
  image:images

}})

if(! updateOne){
 res.status(404) 
  return
}else{
  redirect("/admin/productManagment")
}


}


// cateogary managment  

exports.addcateogary= (req,res)=>{
  
  if(!req.body){
      res.status(400).send({message:"hi you entered any thing"})
      return   
   }
const file=req.files
const images=file.map((values)=>`/img/${values.filename}`);
console.log(file);


// save in db 
const cateogary=new Cateogary({ 
  categary:req.body.Category,    
  image:images
})
cateogary
.save(cateogary)    
.then( data=>{
  console.log("correct")
  res.redirect("/admin/cateogaryManagment")  
}) .catch(err=>{
  console.log("heloo") 
  res.status(400).send({
      message:err.message||"some error occured while creating option "
  });  
});

}   


exports.findCateogary=(req,res)=>{
  
   Cateogary.find({status:true})
    .then(catrogary=>{
      console.log(catrogary)
      res.send(catrogary)
    }).catch(err=>{
      res.status(500).send({message:err.message})
    })

}



exports.unlistcateogary=async(req,res)=>{

  const deleteid=req.query.id
  console.log(deleteid);
  const d=await  Cateogary.updateOne({_id:deleteid},{$set:{status:false}})
  console.log(d)
  res.redirect("/admin/cateogaryManagment")
}

exports.findUnlistCateogary=(req,res)=>{
  
  Cateogary.find({status:false})
   .then(catrogary=>{
     res.send(catrogary)
   }).catch(err=>{
     res.status(500).send({message:err.message})
   })

}

exports.unlistrecyclecateogary=async(req,res)=>{

  const recycleid=req.query.id
  const d=await  Cateogary.updateOne({_id:recycleid},{$set:{status:true}})
  res.redirect("/admin/unlistCateogaryManagment")

}