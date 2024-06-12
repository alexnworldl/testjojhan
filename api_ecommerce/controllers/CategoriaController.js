
import models from '../models'
import resource  from '../resources';
import fs from 'fs';
import path from 'path';
export default {
    



    register: async(req,res)=>{
        try {
            if(req.files){
                var ima_path = req.files.portada.path;
                var name = ima_path.split('\\');
                var portada_name = name[2];
                req.body.imagen = portada_name;
                
            }
            //name, user y password
           console.log(req.body);
            const categoria = await models.Categoria.create(req.body); //await para esperar
            res.status(200).json(categoria);

        } catch (error) {
            res.status(500).send({
                message: "OCURRIO UN PROBLEMA"
                
            });
            console.log(error);
        }

       

    },
    
    
    
    update: async(req,res)=>{
        try {
            if(req.files && req.files.portada){
                var ima_path = req.files.portada.path;//verificar si es portada o imagen y ima a img_path
                var name = ima_path.split('\\');
                var portada_name = name[2];
                
                req.body.imagen = portada_name;
                
            }
            console.log('id',req.body._id);
            
           
            await models.Categoria.findByIdAndUpdate({_id:req.body._id}, req.body);


            let CategoriaT = await models.Categoria.findOne({_id:req.body._id});

            res.status(200).json({
                message: "LA CATEGORIA SE HA MODIFICADO CORRECTAMENTE",
                categoria: resource.Categoria.categoria_list(CategoriaT),
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
            var search = req.query.search;//antes era body por si error
            let Categorias = await models.Categoria.find({
                $or:[
                    {"title":new RegExp(search,"i")},
                ]
            }).sort({'createdAt':-1});
            
            Categorias = Categorias.map((user)=>{
                return resource.Categoria.categoria_list(user);
            })

            res.status(200).json({
                categorias:Categorias
            });
        } catch (error) {
            res.status(500).send({
                message: "OCURRIO UN PROBLEMA"
                
            });
            console.log(error);
        }
    },
    obtener_imagen:async(req,res)=>{
        try {
            var img = req.params['img'];


            fs.stat('./uploads/categoria/'+img, function(err){
                if(!err){
                    let path_img = './uploads/categoria/'+img;
                    res.status(200).sendFile(path.resolve(path_img));
                }else{
                    let path_img = './uploads/default.jpg';
                    res.status(200).sendFile(path.resolve(path_img));
                }
            })
        
        } catch (error) {
            
            res.status(500).send({
                message: "OCURRIO UN PROBLEMA"
                
            });
            console.log(error);
        }
    },
    remove: async(req,res)=>{
        try {
           const Categoria = await models.Categoria.findByIdAndDelete({
            _id: req.query._id
           });
           res.status(200).json({
            message: "LA CATEGORIA SE HA ELIMINADO",

           });
        } catch (error) {
            res.status(500).send({
                message: "OCURRIO UN PROBLEMA"
                
            });
            console.log(error);
        }
    }
}