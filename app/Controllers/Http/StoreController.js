'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Store = use('App/Models/Store')

/**
 * Resourceful controller for interacting with stores
 */
class StoreController {

  /**
   * Create/save a new store.
   * POST stores
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth }) {
      const user = await auth.getUser();
      const {document} = request.only(['document']);
      
      const response = await Store.create({cpf: user.cpf, document})

      return response;
  }
}

module.exports = StoreController
