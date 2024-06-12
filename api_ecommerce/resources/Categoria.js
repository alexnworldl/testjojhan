export default {
    categoria_list: (categoria) => {
        return {
            _id: categoria._id, // Accede al _id en lugar de id
            title: categoria.title,
            imagen: categoria.imagen,
            imagen_home: 'http://localhost:3000'+'/api/categorias/uploads/categoria/'+categoria.imagen,
            state: categoria.state,
        };
    }
}
