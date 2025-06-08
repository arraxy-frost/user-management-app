import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table({ tableName: 'sessions' })
export class Session extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
        primaryKey: true,
    })
    id!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    refreshToken!: string;

    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    userId!: string;
}