import models from '../models'
import resource from '../resources'
export default {
    list:async(req,res) => {
        try {
            let user_id = req.query.user_id;
            let CARTS = await models.Cart.find({
                user: user_id,
            }).populate("variedad").populate({
                path: "product",
                populate: {
                    path: "categoria"
                },
            });

            CARTS = CARTS.map((cart) => {
                return resource.Cart.cart_list(cart);
            });

            res.status(200).json({
                carts: CARTS,
            })
        } catch (error) {
            res.status(500).send({
                message:"OCURRIO UN ERROR",
            });
            console.log(error);
        }
    },
    register:async(req,res) => {
        try {
            let data = req.body;
            //PRIMERO VAMOS A VALIDAR SI EL PRODUCTO EXISTE EN EL CARRITO DE COMPRA
            if(data.variedad){
                let valid_cart = await models.Cart.findOne({
                    user: data.user,
                    variedad: data.variedad,
                    product: data.product,
                });
                if(valid_cart){
                    res.status(200).json({
                        message: 403,
                        message_text: "EL PRODUCTO CON LA VARIEDAD YA EXISTE EN EL CARRITO DE COMPRA",
                    })
                    return;
                }
            }else{
                let valid_cart = await models.Cart.findOne({
                    user: data.user,
                    product: data.product,
                });
                if(valid_cart){
                    res.status(200).json({
                        message: 403,
                        message_text: "EL PRODUCTO YA EXISTE EN EL CARRITO DE COMPRA",
                    })
                    return;
                }
            }

            //SEGUNDO VAMOS A VALIDAR SI EL STOCK ESTA DISPONIBLE

            if(data.variedad){
                let valid_variedad = await models.Variedad.findOne({
                    _id: data.variedad,
                });
                if(valid_variedad.stock < data.cantidad){
                    res.status(200).json({
                        message: 403,
                        message_text: "EL STOCK NO ESTA DISPONIBLE"
                    })
                    return;
                }
            }else{
                let valid_product = await models.Product.findOne({
                    _id: data.product,
                });
                if(valid_product.stock < data.cantidad){
                    res.status(200).json({
                        message: 403,
                        message_text: "EL STOCK NO ESTA DISPONIBLE"
                    });
                    return;
                }
            }
            let CART = await models.Cart.create(data);
            
            let NEW_CART = await models.Cart.findById({_id: CART._id}).populate("variedad").populate({
                path: "product",
                populate: {
                    path: "categoria"
                },
            });
            res.status(200).json({
                cart: resource.Cart.cart_list(NEW_CART),
                message_text: "EL CARRITO SE REGISTRO CON EXITO",
            })
        } catch (error) {
            res.status(500).send({
                message:"OCURRIO UN ERROR",
            });
            console.log(error);
        }
    },
    update:async(req,res) => {
        try {
            let data = req.body;

            //SEGUNDO VAMOS A VALIDAR SI EL STOCK ESTA DISPONIBLE

            if(data.variedad){
                let valid_variedad = await models.Variedad.findOne({
                    _id: data.variedad,
                });
                if(valid_variedad.stock < data.cantidad){
                    res.status(200).json({
                        message: 403,
                        message_text: "EL STOCK NO ESTA DISPONIBLE"
                    })
                    return;
                }
            }else{
                let valid_product = await models.Product.findOne({
                    _id: data.product,
                });
                if(valid_product.stock < data.cantidad){
                    res.status(200).json({
                        message: 403,
                        message_text: "EL STOCK NO ESTA DISPONIBLE"
                    });
                    return;
                }
            }
            let CART = await models.Cart.findByIdAndUpdate({_id: data._id},data);
            
            let NEW_CART = await models.Cart.findById({_id: CART._id}).populate("variedad").populate({
                path: "product",
                populate: {
                    path: "categoria"
                },
            });
            res.status(200).json({
                cart: resource.Cart.cart_list(NEW_CART),
                message_text: "EL CARRITO SE ACTUALIZO CON EXITO",
            })
        } catch (error) {
            res.status(500).send({
                message:"OCURRIO UN ERROR",
            });
            console.log(error);
        }
    },
    delete:async(req,res) => {
        try {
            let _id = req.params.id;
            let CART = await models.Cart.findByIdAndDelete({_id: _id});

            res.status(200).json({
                message_text: "EL CARRITO SE ELIMINO CORRECTAMENTE",
            });
        } catch (error) {
            res.status(500).send({
                message:"OCURRIO UN ERROR",
            });
            console.log(error);
        }
    },
    applyCupon:async(req,res) => {
        try {
            let data = req.body;
            // LA PRIMERA VALIDACIÓN TIENE QUE VER CON LA EXISTENCIA DEL CUPON
            let CUPON = await models.Cupone.findOne({
                code: data.code,
            })
            if(!CUPON){
                res.status(200).json({
                    message: 403,
                    message_text: "EL CUPON INGRESADO NO EXISTE, DIGITE OTRO NUEVAMENTE"
                });
                return;
            }
            // TIENE CON EL USO DEL CUPON -- ESPERA 

            //la parte operativa
            
            let carts = await models.Cart.find({user: data.user_id}).populate("product");
            console.log(carts);
            let products = [];
            let categorias = [];

            CUPON.products.forEach((product) => {
                products.push(product._id);
            });
            //[837373.838383]
            //[{_id: 837373},{_id: 838383}].includes
            CUPON.categorias.forEach((categoria) => {
                categorias.push(categoria._id);
            });
            console.log(products);
            console.log(categorias);
            for (const cart of carts) {
                if(products.length > 0){
                    if(products.includes(cart.product._id+"")){
                        let subtotal = 0;
                        let total = 0;
                        if(CUPON.type_discount == 1){//PORCENTAJE
                            subtotal = cart.price_unitario - cart.price_unitario*(CUPON.discount*0.01);
                        }else{//POR MONEDA
                            subtotal = cart.price_unitario - CUPON.discount;
                        }
                        total = subtotal * cart.cantidad;

                        await models.Cart.findByIdAndUpdate({_id: cart._id},{
                            subtotal: subtotal,
                            total: total,
                            type_discount: CUPON.type_discount,
                            discount: CUPON.discount,
                            code_cupon: CUPON.code,
                        });
                    }
                }
                if(categorias.length > 0){
                    if(categorias.includes(cart.product.categoria+"")){
                        let subtotal = 0;
                        let total = 0;
                        if(CUPON.type_discount == 1){//PORCENTAJE
                            subtotal = cart.price_unitario - cart.price_unitario*(CUPON.discount*0.01);
                        }else{//POR MONEDA
                            subtotal = cart.price_unitario - CUPON.discount;
                        }
                        total = subtotal * cart.cantidad;

                        await models.Cart.findByIdAndUpdate({_id: cart._id},{
                            subtotal: subtotal,
                            total: total,
                            type_discount: CUPON.type_discount,
                            discount: CUPON.discount,
                            code_cupon: CUPON.code,
                        });
                    }
                }
            }

            res.status(200).json({
                message: 200,
                message_text: "EL CUPON SE APLICADO CORRECTAMENTE",
            });
        } catch (error) {
            res.status(500).send({
                message:"OCURRIO UN ERROR",
            });
            console.log(error); 
        }
    },
}