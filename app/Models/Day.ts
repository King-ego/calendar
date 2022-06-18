import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'

export default class Day extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static async CreateUUID(model: Day) {
    model.id = uuid()
  }

  @column()
  public name: number

  @column()
  public task: string

  @column()
  public monthId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
