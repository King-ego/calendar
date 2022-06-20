import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Day from 'App/Models/Day'
import Month from 'App/Models/Month'

export default class DaysController {
  public async store({ request, response, params }: HttpContextContract) {
    const body = request.body()
    const monthId = params.monthId

    await Month.findOrFail(monthId)

    body.monthId = monthId

    const comment = await Day.create(body)
    response.status(201)
    return {
      message: 'comentario criado com sucesso',
      data: comment,
    }
  }
  public async show({ params }: HttpContextContract) {
    const day = await Day.findOrFail(params.id)

    return {
      data: day,
    }
  }

  public async index({ params }: HttpContextContract) {
    let message = 'Não Encontrado'

    const monthId = params.monthId

    await Month.findOrFail(monthId)

    const allDays = await Day.query()
    const days = allDays.filter((e) => e.$attributes.monthId === monthId)

    if (days.length) {
      message = 'Encontrado'
    }

    return {
      message,
      days,
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const days = await Day.findOrFail(params.id)
    const body = request.body()

    days.task = body.task

    await days.save()

    return {
      message: 'task atualizado com sucesso',
      data: days,
    }
  }
}
