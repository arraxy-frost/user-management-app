import { Column, Model, Table, DataType } from "sequelize-typescript";
import { Roles } from "../shared/enums/Roles";

@Table({ tableName: 'users' })
export class User extends Model {
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
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    passwordHash!: string;

    @Column({
        type: DataType.ENUM(...Object.values(Roles)),
        allowNull: false,
        defaultValue: Roles.MANAGER,
        validate: {
            notEmpty: true,
            isIn: [Object.values(Roles)],
        }
    })
    role!: Roles;

    toJSON = function() {
        const values = Object.assign({}, this.get());
        delete values.passwordHash;
        return values;
    };
}