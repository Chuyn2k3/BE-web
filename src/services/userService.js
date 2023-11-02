import db from "../models/index";
import bcrypt from "bcryptjs";
const salt =bcrypt.genSaltSync(10);
let handleUserLogin=(email,password)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let userData={};
            let isExist = await checkUserEmail(email);
            if(isExist){
                 let user= await db.User.findOne({
                    attributes:['email','role','password'],
                    where: {email: email},
                    raw:true
                 });
                 if(user){
                      let check= await bcrypt.compareSync(password,user.password);
                      if(check){
                        userData.errCode=0;
                        userData.errMessage='ok';
                        delete user.password;
                        userData.user=user;
                      }
                      else{
                        userData.errCode=3;
                        userData.errMessage='wrong password';
                      }
                 }else{
                    userData.errCode=2;
                userData.errMessage="user not found";
                
                 }
             
            }
            else{
                userData.errCode=1;
                userData.errMessage="your email isn't exist in system";              
            }
            resolve(userData)
        }
        catch(e){
            reject(e);
        }
       })
}
let checkUserEmail=(userEmail)=>{
   return new Promise(async(resolve,reject)=>{
    try{
        let user =await db.User.findOne({
            where: {
                email: userEmail
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
let getAllUser=(userId)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let users='';
           if(userId === 'All'){
            users= await db.User.findAll({
               attributes:{
                exclude:['password']
               }
            })
           }
           if(userId&&userId !== 'All'){
            users=await db.User.findOne({
                where: {id:userId},
                attributes:{
                    exclude:['password']
                   }
            })
           }
           resolve(users)
        }
        catch(e){
           reject(e);
        }
    });
}
let hashUserPassword=(password)=>{
    return new Promise(async(resolve,reject)=>{
   try{
     var hashPassword=await bcrypt.hashSync(password,salt);
   resolve(hashPassword);
    }catch(e){
    reject(e);
   }
    });
}
let createNewUser=(data)=>{
    return new Promise(async(resolve,reject)=>{
           try{
            let check=await checkUserEmail(data.email);
            if(check===true){
                resolve({
                    errCode:1,
                    message:"email was used,please use another email"
                })
            }
            let hashPasswordFromBcrypt=await hashUserPassword(data.password);
            await db.User.create({
                firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    role: data.role,
    isActive: data.isActive,
    password: hashPasswordFromBcrypt,
    deleteAt: data.deleteAt,
            })
        resolve({
            errCode:0,
            message:'OK'})
           }
           catch(e){
            reject(e);
           }
    })
}
let deleteUser=(userId)=>{
    return new Promise(async(resolve,reject)=>{
        let user=await db.User.findOne({
            where:{id:userId}
        })
        if(!user){
            resolve({
                errode:2,
                errMessage:"the user isn't exist"
            })
        }
        await db.User.destroy({
            where:{id:userId}
        })
        resolve({
            errCode:0,
            message:"The user is deleted"
        })
    })
}
let updateUserData=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            if(!data.id){
                resolve({
                    errCode:2,
                    errMessage:"Missing required parameters"
                })
            }
            let user=await db.User.findOne({
                where: {id: data.id},
                    raw: false
            
                
            })
            if(user){
                user.firstName=data.firstName;
                user.lastName=data.lastName;
                user.phone=data.phone;
                // await db.User.save({
                //     firstName:data.firstName,
                //     lastName:data.lastName,
                //     phone:data.phone,
                // })
                await user.save();
                resolve({
                    errCode:0,
                    message:"Update success"
                });
            }else{
                resolve({
                    errCode:1,
                    errMessage:"User not found"
                });
            }
          
        }
        catch(e){
            reject(e);
        }
    })
}
module.exports={
    handleUserLogin:handleUserLogin,
    getAllUser:getAllUser,
    createNewUser:createNewUser,
    deleteUser:deleteUser,
    updateUserData:updateUserData
}