import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Day from 'App/Models/Day'
import Month from 'App/Models/Month'

export default class DaysController {
  public async store({ request, response, params }: HttpContextContract) {
    const body = request.body()
    const momentId = params.monthId

    await Month.findOrFail(momentId)

    body.monthId = momentId

    const comment = await Day.create(body)
    response.status(201)
    return {
      message: 'comentario criado com sucesso',
      data: comment,
    }
  }

  public async index({ params }: HttpContextContract) {
    let message = 'Não Encontrado'

    const userId = params.monthId

    await Month.findOrFail(userId)

    const days = await Day.query()

    if (days.length) {
      message = 'Encontrado'
    }

    return {
      message,
      days,
    }
  }
}
