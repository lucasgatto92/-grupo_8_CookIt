const fs = require('fs');
let dbProductos = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'));

module.exports = {
    listar: (req, res) => {
        let productos = dbProductos.map(producto => {
            switch (producto.category) {
                case 'esp':
                    producto.category = 'Española'
                    break;
            }
            return producto
        });
        res.render('listarProductos', { productos: productos });
    },
    agregar: (req, res) => {
        res.render('agregarProducto');
    },
    detalle: (req, res) => {
        let idProducto = req.params.id;
        let producto = dbProductos.filter(producto => {
            return producto.id == Number(idProducto)
        })
        res.render('detalleProducto', { producto: producto[0] });
    },
    guardar: (req, res, next) => {
        let id = 0;
        if (fs.existsSync('./data/products.json')) {
            let productos = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'));
            id = productos.length;
            console.log(id)
            let producto = {
                id: id + 1,
                name: req.body.name,
                description: req.body.descripcion,
                image: req.files[0].filename,
                category: req.body.categoria,
                price: req.body.precio,
                descuento: req.body.descuento,
                tiempo: req.body.tiempo,
                porciones: req.body.porciones,
                calorias: req.body.calorias,
                maridaje: req.body.maridaje,
                oferta: req.body.oferta,
                especial: req.body.especial,
                vegano: req.body.vegano,
                bajosodio: req.body.bajosodio,
                celiaco: req.body.celiaco,
            }
            productos.push(producto);
            fs.writeFileSync('./data/products.json', JSON.stringify(productos), 'utf-8')
        } else {
            let productos = [];
            let producto = {
                id: 1,
                name: req.body.name,
                description: req.body.descripcion,
                image: req.files[0].filename,
                category: req.body.categoria,
                price: req.body.precio,
                descuento: req.body.descuento,
                tiempo: req.body.tiempo,
                porciones: req.body.porciones,
                calorias: req.body.calorias,
                maridaje: req.body.maridaje,
                oferta: req.body.oferta,
                especial: req.body.especial,
                vegano: req.body.vegano,
                bajosodio: req.body.bajosodio,
                celiaco: req.body.celiaco,
            }
            productos.push(producto);
            fs.writeFileSync('./data/products.json', JSON.stringify(productos), 'utf-8')

        }

        res.redirect('productos')
            //res.redirect('/productos/create')
    },
    editar: (req, res) => {
        let idProducto = req.params.id;
        let producto = dbProductos.filter(producto => {
            return producto.id == Number(idProducto)
        })
        producto.map(producto => {
            producto.price = Number(producto.price)

            switch (producto.category) {
                case 'esp':
                    producto.category = 'Española'
                    break;
            }
            return producto
        });
        console.log(producto[0].price)
        res.render('editarProducto', { producto: producto[0] });
    },
    actualizar: (req, res) => {
        console.log('actualizando datos')
    },
    borrar: (req, res) => {
        console.log('eliminando datos')
    }

}