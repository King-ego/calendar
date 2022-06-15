import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserCalendar from 'App/Models/UserCalendar'

export default class UserCalendarsController {
  public async index({}: HttpContextContract) {
    let message = 'não encontrado'

    const users = await UserCalendar.query()

    if (users.length) {
      message = 'requesição completa'
    }

    return {
      statusMessage: message,
      users,
    }
  }

  public async show({ params }: HttpContextContract) {
    const user = await UserCalendar.findOrFail(params.id)
    return {
      statusMessage: 'Usuario Econtrado com sucesso',
      user,
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const body = request.body()

    const user = await UserCalendar.create(body)

    response.status(201)

    user.password
    return {
      statusMessage: 'Usuario cadastrado com sucesso',
      user,
    }
  }
}
