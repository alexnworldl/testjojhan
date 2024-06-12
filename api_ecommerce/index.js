import express from 'express'
import cors from 'cors'
import path from 'path'
import mongoose from 'mongoose'
import router from "./router"

//Conexion a la base de dastos

mongoose.Promise = global.Promise;


const dbUrl = "mongodb://localhost:27017/ecommerce_solitek";
mongoose.connect(dbUrl , {
    useNewUrlParser: true,
    useUnifiedTopology: true

}
).then(mongoose => console.log("Conectado a la base de datos en el puerto 27017"))
.catch(err => console.log(err));

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')))
app.use('/api/',router)//usa los rutas


app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log("El servidor se ejecuto perfectamente en el puerto 3000");
})