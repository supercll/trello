import {
    AutoIncrement, BelongsTo,
    Column,
    CreatedAt,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt
} from "sequelize-typescript";
import {User} from "./User";

@Table({
    tableName: 'Attachment'
})
export class Attachment extends Model<Attachment> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false
    })
    userId: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    originName: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    name: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    type: string;

    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
    })
    size: number;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

}