'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with products
 */
const Product = use('App/Models/Product');

const Inventorie = use('App/Models/Inventorie')
const Transaction = use('App/Models/Transaction')

const Helpers = use('Helpers')

class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const productAll = Product.all()
    return productAll;
  }

  /**
   * Render a form to be used for creating a new product.
   * GET products/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response,auth }) {
    try {
      const user = await auth.getUser();
      if (user.rol == 1) {
        const data = request.all()
        
        const newProduct = await Product.findBy('code',data.code);
        if (newProduct) {
          return response.send({message:{status:'Existente'}})
        }
        const product = new Product()
        const inventory = new Inventorie()
        const transaction = new Transaction()
        //product
        product.code = data.code
        product.name = data.name
        product.description = data.description
        // product.image = data.image
        //img upload
        const IMG = request.file('image')

        product.image = data.code+'-'+data.name+'.'+IMG.subtype

        await IMG.move(Helpers.publicPath('uploads/'+user.id), {
          name: product.image
        })
        await product.save();
        //Inventory
        inventory.product_id = product.id
        inventory.user_id =  user.id
        inventory.quantity = data.quantity
        inventory.price = data.price
        inventory.tax = data.tax
        await inventory.save();//create inventory
        //Transaction
        transaction.inventorie_id = inventory.id
        transaction.type = 1
        transaction.description = "Add Producto"
        transaction.quantity = request.input('quantity')
        await transaction.save();//create transaction
        return response.json(product);
      }
      return response.send({message:{status:'You need to be an administrator to make changes'}})

    } catch (error) {
      return response.send(error)
    }
  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const productId = await Product.findBy('id',params.id)
    if(productId){
      return productId
    }
    return response.send({message:{status:'the product you are trying to find does not exist'}})
  }

  /**
   * Render a form to update an existing product.
   * GET products/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      const data = request.all()
      const productExists = await Product.findBy('id',params.id)//verificar si el usuario ya existe
      if(productExists){
        productExists.merge(data)
        await productExists.save()
        return productExists;
      }
      return response.send({message:{erro:'The product you are trying to update does not exist!, please try again with another product'}})
    } catch (error) {
      return response.send(error)
    }
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response,auth }) {
    const user = await auth.getUser();
    if (user.rol == 1) {
      const productId = await Product.findBy('id',params.id)
      if(productId){
        await productId.delete()
        return productId
      }
      return response.send({message:{status:'The product you are trying to delete does not exist!, please try again with another product'}})
    }
    }
}

module.exports = ProductController
