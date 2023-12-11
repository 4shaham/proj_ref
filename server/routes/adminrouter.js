
const express=require("express")
const route=express.Router()
const adminservices=require('../services/adminrender')
const controller=require('../controller/adminside/admincontroller')
const store=require('../controller/adminside/multer.js')





 
route.get('/adminlogin',adminservices.adminloginRoutes)

route.get('/admin/',adminservices.admindashRoutes)
// usermanagment  

route.get('/admin/UserManagment',adminservices.adminUserManagment)


// product managment

route.get('/admin/productManagment',adminservices.adminProductManagment)

route.get('/admin/addproduct',adminservices.adminaddproduct)

route.get('/admin/editproduct',adminservices.admineditproduct)

route.get('/admin/unlistproduct',adminservices.adminunllistproduct)




// cateogarymanagment  

route.get('/admin/cateogaryManagment',adminservices.admincateogarymanagment)

route.get('/admin/addCateogaryManagment',adminservices.adminAddCateogarymanagment)

route.get('/admin/unlistCateogaryManagment',adminservices.adminUnlistCateogarymanagment)
   
// add catrogary

route.post('/admin/addCateogary',store.array('image',12),controller.addcateogary)
// delete cateogary
route.get('/admin/unlistCateogary',controller.unlistcateogary)

//recycle 
route.get('/admin/unlistrecycleCateogary',controller.unlistrecyclecateogary)

//api  
   

route.post('/admin/login',controller.verification)

// add to product  

route.post('/admin/addproduct',store.array('image',12),controller.addproduct)

// delete product 

route.get('/admin/deleteproduct',controller.deleteproduct)

//recycle product

route.get('/admin/recycleproduct',controller.recycleproduct)

//editproduct 

route.post("/admin/editproduct",store.array('image',12),controller.editproduct)



// axios    


route.get('/admin/findproduct',controller.findproduct)

route.get('/admin/unlistProductaxios',controller.findunlistproductaxios)
           
route.get('/admin/editproductAxios',controller.findeditproduct)


route.get('/admin/findCateogary',controller.findCateogary)

route.get('/admin/findUnlistCateogary',controller.findUnlistCateogary)


module.exports=route;
  