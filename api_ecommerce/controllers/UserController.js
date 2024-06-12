import bcrypt from 'bcryptjs'
import models from '../models'
import token from '../services/token'
import resource from '../resources'
export default {
    



    register: async(req,res)=>{
        try {
            //name, user y password
            req.body.password = await bcrypt.hash( req.body.password,10);
            const userT = await models.User.create(req.body); //await para esperar
            res.status(200).json({
                message:"REGISTRADO",
                user:userT


            });

        } catch (error) {
            res.status(500).send({
                message: "OCURRIO UN PROBLEMA"
                
            });
            console.log(error);
        }

       

    },
    register_admin: async(req,res)=>{
        try {
            //name, user y password
            const userV = await models.User.findOne({email: req.body.email});
            if(userV){
                res.status(500).send({
                    message: "EL USUARIO YA EXISTE"
                    
                });
            }
            req.body.rol = "admin";
            req.body.password = await bcrypt.hash( req.body.password,10);
            let user = await models.User.create(req.body); //await para esperar
            res.status(200).json({
                user: resource.User.user_list(user)


            });

        } catch (error) {
            res.status(500).send({
                message: "OCURRIO UN PROBLEMA"
                
            });
            console.log(error);
        }

       

    },
    login: async(req,res)=>{
        try {
            const user = await models.User.findOne({email: req.body.email, state:1});//encuentro al usuario con base al email
            if(user){
                //si esta registrado en el sistema 
                let compare = await bcrypt.compare(req.body.password,user.password);//comparacion de contraseñas 
                if(compare){
                    let tokenT = await token.encode(user._id,user.rol,user.email);//si todo esta bien se genera el token
                    const USER_FRONTED = {
                        token:tokenT,
                        user:{
                            _id: user.id,
                            name:user.name,
                            email:user.email,
                            subname:user.subname,
                            avatar:user.avatar,

                        },//armar el cuerpo del token
                    }
                    res.status(200).json({
                        USER_FRONTED:USER_FRONTED,
                    });


                }else{
                    res.status(500).send({
                        message: "EL USUARIO NO ESTÁ REGISTRADO EN EL SISTEMA"
                        
                    });

                }
            }else{
                //no esta registrado en el sitema
                res.status(500).send({
                    message: "EL USUARIO NO ESTÁ REGISTRADO EN EL SISTEMA"
                    
                });
            }
        } catch (error) {
            res.status(500).send({
                message: "OCURRIO UN PROBLEMA"
                
            });
            console.log(error);
        }

    },
    login_admin: async(req,res)=>{
        try {
            const user = await models.User.findOne({email: req.body.email, state:1,rol:'admin'});//encuentro al usuario con base al email
            if(user){
                //si esta registrado en el sistema 
                let compare = await bcrypt.compare(req.body.password,user.password);//comparacion de contraseñas 
                if(compare){
                    let tokenT = await token.encode(user._id,user.rol,user.email);//si todo esta bien se genera el token
                    const USER_FRONTED = {
                        token:tokenT,
                        user:{
                            name:user.name,
                            email:user.email,
                            subname:user.subname,
                            avatar:user.avatar,
                            rol:user.rol,

                        },//armar el cuerpo del token
                    }
                    res.status(200).json({
                        USER_FRONTED:USER_FRONTED,
                    });


                }else{
                    res.status(500).send({
                        message: "EL USUARIO NO ESTÁ REGISTRADO EN EL SISTEMA"
                        
                    });

                }
            }else{
                //no esta registrado en el sitema
                res.status(500).send({
                    message: "EL USUARIO NO ESTÁ REGISTRADO EN EL SISTEMA"
                    
                });
            }
        } catch (error) {
            res.status(500).send({
                message: "OCURRIO UN PROBLEMA"
                
            });
            console.log(error);
        }

    },
    update: async(req,res)=>{
        try {
            if(req.files){
                var ima_path = req.files.avatar.path;
                var name = ima_path.split('\\');
                var avatar_name = name[2];
                console.log(avatar_name);

            }
            if(req.body.password){
               req.body.password = await bcrypt.hash( req.body.password,10);
         }
         console.log(req.body._id);
              await models.User.findByIdAndUpdate({_id: req.body._id},req.body);

            let UserT = await models.User.findOne({_id: req.body._id});

            res.status(200).json({
                message: "EL USUARIO SE HA MODIFICADO CORRECTAMENTE",
                user: resource.User.user_list(UserT),
            });
        } catch (error) {
            res.status(500).send({
                message: "OCURRIO UN PROBLEMA"
                
            });
            console.log(error);
        }

    },
    
    list: async(req,res)=>{

        try {
            var search = req.query.search;
            let Users = await models.User.find({
                $or:[
                    {"name":new RegExp(search,"i")},
                    {"subname":new RegExp(search,"i")},
                    {"email":new RegExp(search,"i")},
                ]
            }).sort({'createdAt':-1});
            
            Users = Users.map((user)=>{
                return resource.User.user_list(user);
            })

            res.status(200).json({
                users:Users
            });
        } catch (error) {
            res.status(500).send({
                message: "OCURRIO UN PROBLEMA"
                
            });
            console.log(error);
        }
    },
    
    remove: async(req,res)=>{
        try {
           const User = await models.User.findByIdAndDelete({
            _id: req.query._id
           });
           res.status(200).json({
            message: "EL USUARIO SE HA ELIMINADO",

           });
        } catch (error) {
            res.status(500).send({
                message: "OCURRIO UN PROBLEMA"
                
            });
            console.log(error);
        }
    }
}