import express from "express";
import homeControllor from "../controllers/homeController";
import userController from "../controllers/userController";
let router =express.Router();

let initWebRoutes=(app)=>{
    router.get("/",homeControllor.getHomePage);
    router.get("/abc",(req,res)=>{
        return res.send("helloabc")
    });
    router.get("/crud",homeControllor.getCRUD);
    router.post("/post-crud",homeControllor.postCRUD);
    router.get("/get-crud",homeControllor.displayGetCRUD);
    router.get("/edit-crud",homeControllor.getEditCRUD);
    router.post('/put-crud',homeControllor.putCRUD);
    router.get('/delete-crud',homeControllor.deleteCRUD);


    router.post('/api/login',userController.handleLogin);
    router.get('/api/get-all-user',userController.handleGetAllUsers);
    router.post('/api/create-new-user',userController.handleCreateNewUser);
    router.put('/api/edit-user',userController.handleEditUser);
    router.delete('/api/delete-user',userController.handleDeleteUser);
    return app.use("/",router);
}
module.exports=initWebRoutes;