import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Year from 'App/Models/Year'
import Month from 'App/Models/Month'

export default class MonthsController {
  public async store({ request, response, params }: HttpContextContract) {
    const body = request.body()
    const momentId = params.yearId

    await Year.findOrFail(momentId)

    body.yearId = momentId

    const comment = await Month.create(body)
    response.status(201)
    return {
      message: 'comentario criado com sucesso',
      data: comment,
    }
  }

  public async index({ params }: HttpContextContract) {
    let message = 'Não Encontrado'

    const userId = params.yearId

    await Year.findOrFail(userId)

    const months = await Month.query()

    if (months.length) {
      message = 'Encontrado'
    }

    return {
      message,
      months,
    }
  }
}
