import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserCalendar from 'App/Models/UserCalendar'
import Year from 'App/Models/Year'

export default class YearsController {
  public async store({ request, response, params }: HttpContextContract) {
    const body = request.body()
    const userId = params.userId

    await UserCalendar.findOrFail(userId)

    body.userId = userId

    const comment = await Year.create(body)
    response.status(201)
    return {
      message: 'comentario criado com sucesso',
      data: comment,
    }
  }

  public async index({ params }: HttpContextContract) {
    let message = 'Não Encontrado'

    const userId = params.userId

    await UserCalendar.findOrFail(userId)

    const yearsAll = await Year.query()

    const years = yearsAll.filter((e) => e.$attributes.userId === userId)

    if (years.length) {
      message = 'Sucesso'
    }
    return {
      message,
      years,
    }
  }
}
