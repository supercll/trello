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
import {BoardListCard} from "./BoardListCard";

@Table({
    tableName: 'comment'
})
export class Comment extends Model<Comment> {

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

    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => BoardListCard)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false
    })
    boardListCardId: number;

    @Column({
        type: DataType.STRING(2000),
        allowNull: false
    })
    content: string;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

}