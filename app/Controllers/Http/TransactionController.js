'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Transaction = use('App/Models/Transaction')
const Store = use('App/Models/Store')

/**
 * Resourceful controller for interacting with transactions
 */
class TransactionController {
  /**
   * Show a list of all transactions.
   * GET transactions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    return await Transaction.all();
  }

  /**
   * Create/save a new transaction.
   * POST transactions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth }) {
    const user = await auth.getUser();
    const store = await Store.findByOrFail('cpf', user.cpf)
    const {document, amount } = request.all()


    const payload = {
      from_cnpj: store.toJSON()['document'],
      to_cnpj: document,
      amount
    }

    return await Transaction.create(payload)
  }
}

module.exports = TransactionController
