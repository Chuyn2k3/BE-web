import db from "../models/index";
//import joinproject from "../models/joinproject";
let createNewProject=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let check=await checkNameProject(data.name);
                if(check.errCode===0){
                    resolve({
                        errCode:1,
                        message:"ten project da duoc su dung"
                    })
                }
            await db.Project.create({
                name: data.name,
                description: data.description,
                status: data.status,
                startTime: data.startTime,
                income:data.income,           
                deletedAt: data.deleteAt,              
                        })
                    resolve({
                        errCode:0,
                        message:'ok'
                    })
        }
        catch(e){
            reject(e);
        }
    })

}
//ham check name project ton tai
let checkNameProject=(nameProject)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let projectData={};
            let name =await db.Project.findOne({
                //attributes:['name','description','status','startTime','income',],
                where: {
                    name: nameProject
                },
                raw:true
            })
            if(name){
            
                    projectData.errCode=0;
                    projectData.errMessage="Da tim thay project";
                    projectData.project=name
               
            }
            else{
               
                    projectData.errCode=1;
                    projectData.errMessage="Khong tim thay project"
                
            }
            resolve(projectData)
        }
        catch(e){
            reject(e);
        }
       })
}
// lay du lieu tat ca project
let getAllProject=(projectId)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let project='';
            // id All thi lay het thong tin cua tat ca nguoi dung
           if(projectId === 'All'){
            project= await db.Project.findAll({
                // khong lay thuoc tinh password cho client
            //    attributes:{
            //     exclude:['']
            //    }
            })
           }
           if(projectId&&projectId !== 'All'){
            project=await db.Project.findOne({
                where: {id:projectId},
                //khong lay thuoc tinh nao thi dien vao exclude
                // attributes:{
                //     exclude:['']
                //    }
            })
           }
           // neu khong 
           resolve(project)
        }
        catch(e){
           reject(e);
        }
    });
}
// ham xoa project
let deleteProject=(projectId)=>{
    return new Promise(async(resolve,reject)=>{
        let project= await db.Project.findOne({
            where:{id:projectId},
            //raw:false
        })
        if(!project){
            resolve({
                errCode:2,
                errMessage:"Project khong ton tai"
            })
        }
        await db.Project.destroy({
            where:{id:projectId}
        })
        resolve({
            errCode:0,
            errMessage:"Project da duoc xoa"
        })
        
    })
}
// ham sua du lieu project
let updateProjectData=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            if(!data.id){
                resolve({
                    errCode:2,
                    errMessage:"khong co id truyen vao hehe"
                })
            }
            let project=await db.Project.findOne({
                where: {id: data.id},
                raw: false
            
            })
            if(project){
                project.name=data.name;
                project.description=data.description;
                project.status=data.status;
                project.startTime=data.startTime;
                project.income=data.income;
                await project.save();
                resolve({
                    errCode:0,
                    errMessage:"Update thanh cong"
                })
            }else{
                resolve({
                    errCode:1,
                    errMessage:"Project khong tim thay"
                });
            }
          
        }
        catch(e){
            reject(e);
        }

    })
}
let joininProject=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            if(!data.idofProject||!data.idofUser){
                resolve({
                    errCode:2,
                    errMessage:"Nhap thieu thong tin "
                })
            }
            let user=await db.User.findOne({
                where: {id: data.idofUser},
                raw: false
            
            })
            let project=await db.Project.findOne({
                where: {id: data.idofProject},
                raw: false
            
            })
            if(user&&project){
                let check= checkjoinProject(data.idofProject,data.idofUser);
                if(!check){
                    resolve({
                        errCode:5,
                        errMessage:"User da co trong project tu truoc"
                        
                    })
                }
                else{
                
                await db.JoinProject.create({
                    idUser:data.idofUser,
                    idProject:data.idofProject
                })
                resolve({
                    errCode:0,
                    errMessage:"Them user vao project thanh cong"
                })
            }
            }if(user&&!project){
                resolve({
                    errCode:1,
                    errMessage:"Project khong tim thay"
                });
            }
            if(!user&&project){
                resolve({
                    errCode:1,
                    errMessage:"User khong tim thay"
                });
            }
            else{
                resolve({
                    errCode:1,
                    errMessage:"Project va User deu khong tim thay"
                });
            }
           
        }
        catch(e){
            reject(e);
        }

    })
}
// ham xoa user trong project
let deleteUserFromProject=(data)=>{
    return new Promise(async(resolve,reject)=>{
    try{
        if(!data.idUser||!data.idUser){
            resolve({
                errCode:2,
                errMessage:"Nhap thieu thong tin "
            })
        }
        let project= await db.JoinProject.findOne({
            where:{idProject:data.idProject},
            //raw:false
        })
        let userOnProject= await db.JoinProject.findOne({
            where:{idProject:data.idProject,
            idUser:data.idUser},
            //raw:false
        })
        if(!project){
            resolve({
                errCode:1,
                errMessage:"khong ton tai Project"
            })
        }
        if(!userOnProject){
            resolve({
                errCode:1,
                errMessage:"khong ton tai user trong project"
            })
        }
        await db.JoinProject.destroy({
            where:{
            idProject:data.idProject,
            idUser:data.idUser
            }
        })
        resolve({errCode:0,
            errMessage:"Xoa user khoi project thanh cong"});
    }
    catch(e){
        reject(e);
    }
})
}
let checkjoinProject=(idofUser,idofProject)=>{
    return new Promise(async(resolve,reject)=>{
        try{
        
            let idUser =await db.JoinProject.findOne({
            
                where: {
                    idUser: idofUser
                },
                raw:true
            })
            let idProject =await db.JoinProject.findOne({
            
                where: {
                    idProject: idofProject
                },
                raw:true
            })
            if(idUser&&idProject){
            
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
module.exports={
    createNewProject:createNewProject,
    checkNameProject:checkNameProject,
    getAllProject:getAllProject,
    deleteProject:deleteProject,
    updateProjectData:updateProjectData,
    joininProject:joininProject,
    deleteUserFromProject:deleteUserFromProject
}