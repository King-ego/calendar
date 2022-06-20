import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Year from 'App/Models/Year'
import Month from 'App/Models/Month'

export default class MonthsController {
  public async store({ request, response, params }: HttpContextContract) {
    const body = request.body()
    const yearId = params.yearId

    await Year.findOrFail(yearId)

    body.yearId = yearId

    const month = await Month.create(body)
    response.status(201)
    return {
      message: 'Mês criado com sucesso',
      data: month,
    }
  }

  public async index({ params }: HttpContextContract) {
    let message = 'Não Encontrado'

    const yearId = params.yearId

    await Year.findOrFail(yearId)

    const monthsAll = await Month.query()

    const months = monthsAll.filter((e) => e.$attributes.yearId === yearId)

    if (months.length) {
      message = 'Encontrado'
    }

    return {
      message,
      months,
    }
  }
}
