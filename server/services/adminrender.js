
const axios=require("axios")


exports.adminloginRoutes=(req,res)=>{
    res.render("adminlogin")
}   

exports.admindashRoutes=(req,res)=>{       
    res.render("admindashboard")
}
   
exports.adminProductManagment=(req,res)=>{
    axios.get(`http://localhost:${process.env.PORT}/admin/findproduct`)   
    .then((response)=>{      
        console.log("pppp");
        res.render("adminProductManagment",{Product:response.data}) 
    }).catch(err=>{
        console.log("hii")    
        res.send(err)   
    })        
}
 
exports.adminaddproduct=(req,res)=>{
    res.render("adminaddproduct",{message:{
        pname:req.session.pname,
        bname:req.session.bname,
        category:req.session.category,
        subtitle:req.session.subtitle,
        descriptionheading:req.session.descriptionheading,
        description:req.session.description,
        firstprice:req.session.firstprice,
        lastprice:req.session.lastprice,
        discount:req.session.discount,
        color:req.session.color,
        instock:req.session.instock,
        images: req.session.images
    }})    
}

  
exports.admineditproduct=(req,res)=>{
   const id=req.query.id
    axios.get(`http://localhost:${process.env.PORT}/admin/editproductAxios?id=${id}`)   
    .then((response)=>{      
        console.log("pppp");
        
        res.render("admineditproduct",{Product:response.data}) 
    }).catch(err=>{
        console.log("hii")    
        res.send(err)   
    }) 
   
}   


exports.adminunllistproduct=(req,res)=>{
    axios.get(`http://localhost:${process.env.PORT}/admin/unlistProductaxios`)   
    .then((response)=>{      
        console.log("pppp");
        res.render("adminunlistproduct",{Product:response.data}) 
    }).catch(err=>{
        console.log("hii")    
        res.send(err)   
    })      
    
}

  
exports.admincateogarymanagment=(req,res)=>{
    axios.get(`http://localhost:${process.env.PORT}/admin/findCateogary`)   
    .then((response)=>{      
        console.log("pppp");
        res.render("adminCateogaryManagment",{Cateogary:response.data}) 
    }).catch(err=>{
        console.log("hii")    
        res.send(err)   
    }) 
    
}

exports.adminAddCateogarymanagment=(req,res)=>{
    res.render("adminaddCateogary")
}

exports.adminUnlistCateogarymanagment=(req,res)=>{
    axios.get(`http://localhost:${process.env.PORT}/admin/findUnlistCateogary`) 
    .then((response)=>{      
        res.render("adminunlistCateogary",{Cateogary:response.data}) 
    }).catch(err=>{  
        res.send(err)   
    }) 
}



//  usermanagment  

exports.adminUserManagment=(req,res)=>{
    res.render("adminUsermanagment")
}