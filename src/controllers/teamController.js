import teamService from "../services/teamService";

let handleGetAllTeams= async(req,res)=>{
    let id=req.query.id;
    if(!id){
      return res.status(200).json({
        errCode:1,
        errMessage:'Missing requires parameters',
        users:[]
    })
    }
    let users =await teamService.getAllTeam(id);
    console.log(users)
    return res.status(200).json({
        errCode:0,
        errMessage:'get team success',
        users
    })
}
let handleCreateNewTeam=async(req,res)=>{
    let message=await teamService.createNewTeam(req.body);
    console.log(message);
    return res.status(200).json(message);
} 
let handleDeleteTeam=async(req,res)=>{
   if(!req.body.id){
     return res.status(200).json({ 
         errCode:1,
         errMessage:"Missing requires parameters"
     })
   }
   let message=await teamService.deleteTeam(req.body.id);
   return res.status(200).json(message);
 }
 let handleEditTeam=async(req,res)=>{
   let data=req.body;
   let message=await teamService.updateTeamData(data);
   return res.status(200).json(message);
 }
let bulkCreateSchedule=async(req,res)=>{
  try{
    let infor=await teamService.bulkCreateSchedule(req.body);
    return res.status(200).json(
      infor
    ) 
  }
  catch(e){
    return res.status(200).json({
      errCode:-1,
      errMessage:"Error from the server"
    })
  }
}
let getScheduleByDate=async(req,res)=>{
  try{
    let infor=await teamService.getScheduleByDate(req.query.teamId,req.query.date);
    return res.status(200).json(
      infor
    )
  }
  catch(e){
    return res.status(200).json({
      errCode:-1,
      errMessage:"Error from the server"
    })
  }
}
module.exports={
    handleGetAllTeams:handleGetAllTeams,
    handleCreateNewTeam:handleCreateNewTeam,
    handleEditTeam:handleEditTeam,
    handleDeleteTeam:handleDeleteTeam,
    bulkCreateSchedule:bulkCreateSchedule,
    getScheduleByDate:getScheduleByDate
}