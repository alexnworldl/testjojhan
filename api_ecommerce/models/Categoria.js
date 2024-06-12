//todas las caracteristicas del modelo
import mongoose,{Schema} from 'mongoose';

const CategoriaSchema = new Schema({
   title:{type:String,maxlength:20,required:true},
   imagen:{type:String,maxlength:200,required:false},
   state:{type:Number,maxlength:2,default:1}



},{
    timestamps: true
});

const Categoria = mongoose.model("categoria",CategoriaSchema);
export default Categoria;