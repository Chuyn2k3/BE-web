import db from "../models/index";
import projectService from "../services/projectService"
 let handleGetAllProject=async(req,res)=>{
    let id= req.body.id; // All, id
    let project=await projectService.getAllProject(id);
    if(!id){
        return res.status(200).json(
            {
                errCode:1,
                errMessage:"khong co id duoc truyen vao",
                project:[]
            }
        )
    }
    return res.status(200).json({
        errCode:0,
        errMessage:'request thanh cong',
        project
    })

 }
let handleCreateNewProject=async(req,res)=>{
    let message=await projectService.createNewProject(req.body);
    console.log(message);
    return res.status(200).json(message)

}
//ham dang nhap vao project
let handleLoginProject=async(req,res)=>{
    let checkname=req.body.name;
    if(!checkname){
        return res.status(500).json({
            errCode:1,
            message:'thieu ten project',
           
    
        })
    }
    let projectData= await projectService.checkNameProject(checkname);
    return res.status(200).json({
        errCode:projectData.errCode,
        message:projectData.errMessage,
        project:projectData.project?projectData.project:{}
       
       
    })
}
// api xoa nguoi dung
let handleDeleteProject=async(req,res)=>{
    if(!req.body.id){
        return res.status(200).json({
            errCode:1,
            errMessage:'khong co id truyen vao'
        })
    }
    let message=await projectService.deleteProject(req.body)
    console.log(message);
    return res.status(200).json(message);
}
// ham sua du lieu project
let handleEditProject=async(req,res)=>{
    let data=req.body;
    let message=await projectService.updateProjectData(data);
    return res.status(200).json(message);

}
// ham tao mqh giua user va project
let handleJoinProject=async(req,res)=>{
   
    let message=await projectService.joininProject(req.body)
    console.log(message);
    return res.status(200).json(message);
}
// ham xoa user trong project
let handleDeleteUserFromProject=async(req,res)=>{
    let message=await projectService.deleteUserFromProject(req.body)
    console.log(message);
    return res.status(200).json(message);
}
    
module.exports={
    handleGetAllProject:handleGetAllProject,
    handleCreateNewProject:handleCreateNewProject,
    handleLoginProject:handleLoginProject,
    handleDeleteProject:handleDeleteProject,
    handleEditProject:handleEditProject,
    handleJoinProject:handleJoinProject,
    handleDeleteUserFromProject:handleDeleteUserFromProject
}