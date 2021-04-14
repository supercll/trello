import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt
} from 'sequelize-typescript';
import { Op } from 'sequelize';
import { BoardList } from './BoardList';
import { User } from './User';
import { CardAttachment } from './CardAttachment';
import { Comment } from './Comment';

@Table({
  tableName: 'BoardListCard'
})
export class BoardListCard extends Model<BoardListCard> {
  static Op = Op;
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

  @ForeignKey(() => BoardList)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false
  })
  boardListId: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  name: string;

  @Column({
    type: DataType.STRING(2000),
    allowNull: false,
    defaultValue: ''
  })
  description: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    defaultValue: 0
  })
  order: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  status: Boolean;

  @HasMany(() => CardAttachment)
  attachments: CardAttachment[];

  @HasMany(() => Comment)
  comments: Comment[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
