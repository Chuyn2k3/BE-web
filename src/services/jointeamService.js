import db from "../models/index";

let checkUserOnTeam=(data)=>{
    return new Promise(async(resolve,reject)=>{
     try{
         let user =await db.JoinTeam.findOne({
             where: {
                 idUser: data.idUser,
                 idTeam:data.idTeam
             }
         })
         if(user){
             resolve(true)
         }
         else{
             resolve(false)
         }
     }
     catch(e){
         reject(e);
     }
    })
 }
let addUserOnTeam=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try{
           let check= checkUserOnTeam(data);
            if(check){
                resolve({
                    errCode:2,
                    errMessage:"user was on team,please another user"
                })
            }
            else{
            let team=await db.Team.findOne({
                where: {id: data.idTeam},
                    //raw: false
            
            })
            let user=await db.User.findOne({
                where: {id: data.idUser},
                    //raw: false
            
            })
            console.log(team)
            console.log(user)
            if(team){
                await db.JoinTeam.create({
                 idTeam: team.id,
                 idUser: user.id,
                 }); 
                resolve({
                    errCode:0,
                    message:"Add success"
                });
            }else{
                resolve({
                    errCode:1,
                    errMessage:"Team not found"
                });
            }
        }
        }
        catch(e){
            reject(e);
        }
    })
}
let deleteUserOnTeam=(data)=>{
    return new Promise(async(resolve,reject)=>{
        let team=await db.Team.findOne({
            where:{id:data.idTeam}
        })
        if(!team){
            resolve({
                errode:2,
                errMessage:"the team isn't exist"
            })
        }
        else{
        await db.JoinTeam.destroy({
            where:{idTeam:data.idTeam,idUser:data.idUser}
        }); 
        resolve({
            errCode:0,
            message:"The user is deleted on team"
        })
    }
    })
}
let getAllUserOnTeam=(teamId)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let users='';
           
            users= await db.JoinTeam.findAll({
              where:{idTeam:teamId}
            })
           
           let user=[];
           for(let i=0;i<users.length;i++){
            let _user=await db.User.findOne({
                where: {id:users[i].idUser},
                attributes:{
                    exclude:['password']
                   }
            })
              user[i]=_user;
           }
           resolve(user)

        }
        catch(e){
           reject(e);
        }
    });
}
module.exports={
    addUserOnTeam:addUserOnTeam,
    deleteUserOnTeam:deleteUserOnTeam,
    getAllUserOnTeam:getAllUserOnTeam
}