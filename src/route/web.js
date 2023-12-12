import express from "express";
import homeControllor from "../controllers/homeController";
import userController from "../controllers/userController";
import teamController from "../controllers/teamController";
import jointeamController from "../controllers/jointeamController";
import projectController from "../controllers/projectController"
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

    router.get('/api/get-all-team',teamController.handleGetAllTeams);
    router.post('/api/create-new-team',teamController.handleCreateNewTeam);
    router.put('/api/edit-team',teamController.handleEditTeam);
    router.delete('/api/delete-team',teamController.handleDeleteTeam);

    router.get('/api/get-all-user-team',jointeamController.handleGetAllUserOnTeam);
    router.post('/api/add-user-team',jointeamController.handleAddUserOnTeam);
    router.delete('/api/delete-user-team',jointeamController.handleDeleteUserOnTeam);
    router.post('/api/bulk-create-schedule',teamController.bulkCreateSchedule);
    router.get('/api/get-schedule-team-by-date',teamController.getScheduleByDate);

    router.get("/api/get-all-project",projectController.handleGetAllProject);
    router.post("/api/loginProject",projectController.handleLoginProject);
    router.post("/api/create-new-project",projectController.handleCreateNewProject);
    router.put('/api/edit-project',projectController.handleEditProject);
    router.delete('/api/delete-project',projectController.handleDeleteProject);
    router.post('/api/add-user-project',projectController.handleJoinProject);
    router.delete('/api/delete-userfromproject',projectController.handleDeleteUserFromProject)

    return app.use("/",router); 
}
module.exports=initWebRoutes;