'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with sales
 */
const Sale = use('App/Models/Sale')
const Inventory = use('App/Models/Inventorie')
const Transaction = use('App/Models/Transaction')
const Product = use ('App/Models/Product')

class SaleController {
  /**
   * Show a list of all sales.
   * GET sales
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    try {
      const sale = await Sale.query()
      .with('product')
      .with('user')
      .fetch()
      return sale;
    } catch (error) {
      return response.send(error);
    }
  }

  /**
   * Render a form to be used for creating a new sale.
   * GET sales/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new sale.
   * POST sales
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const user = await auth.getUser();
    var newQuantity = 0
    var oldQantity = 0
    var total = 0
    const sale = new Sale();
    try {
      const data = request.all()
      const transaction = new Transaction()
      const inventory = await Inventory.findBy('product_id',data.product_id)
      console.log(inventory)
      oldQantity = inventory.quantity
      newQuantity = oldQantity - data.quantity
      inventory.quantity = newQuantity
      await inventory.save()
      //transaction
      transaction.inventorie_id = inventory.id
      transaction.type = 2
      transaction.description = "Add sale"
      transaction.quantity = request.input('quantity')
      await transaction.save();      
      //sale
      total = (((inventory.price * inventory.tax)/100)+inventory.price) * data.quantity
        if (data.discount > 0) {
          var des = (total*data.discount)/100;
          total = total - des;
        }
      sale.product_id = inventory.product_id
      sale.user_id = user.id
      sale.quantity = data.quantity
      sale.discount = data.discount
      sale.status = 'Pagado'
      sale.total = total
      sale.paymenth_method = data.paymenth_method
      await sale.save();
      return response.json(sale)
    } catch (error) {
      return response.send(error)
    }
  }

  /**
   * Display a single sale.
   * GET sales/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      const sale = await Sale.findBy('id',params.id)
      // return response.json(sale)
      return response.send({sale, status: 202})
    } catch (error) {
      return response.send({message:{status:error}})
    }
  }

  /**
   * Render a form to update an existing sale.
   * GET sales/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update sale details.
   * PUT or PATCH sales/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    //const data = request.all()
    const user = await auth.getUser();
    if (user.rol == 1) {
      const sale = await Sale.findBy('id',params.id)
      if(sale){
        console.log(sale)
        var newQuantity
        const transaction = new Transaction()
        console.log(sale.product_id)
        const inventory = await Inventory.findBy('product_id',sale.product_id)
        newQuantity = inventory.quantity + sale.quantity;
        sale.status = 'CANCEL'
        inventory.quantity = newQuantity
        transaction.quantity = sale.quantity
        transaction.inventory_id = inventory.id
        transaction.type = 3
        transaction.description = "Add Cancel"
        transaction.save();
        inventory.save();
        sale.save();
        // return response.json(sale);
        return response.send({sale, status: 202})
      }
      return response.send({message:{status:'The sale you are trying to cancel does not exist'}})
    }
    return response.send({message:{status:'You need to be an administrator to make changes'}})
  }

  /**
   * Delete a sale with id.
   * DELETE sales/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response,auth }) {
    const user = await auth.getUser();
    if (user.rol == 1) {
      const sale = await Sale.findBy('id',params.id)
      if(sale){
        await sale.delete()
        return sale
        return response.send({sale, status: 202})
      }
      return response.send({message:{status:'No successful'}})
    }
    return response.send({message:{status:'You need to be an administrator to make changes'}})
  }
}

module.exports = SaleController
