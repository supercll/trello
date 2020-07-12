import {
    Controller,
    Ctx,
    Post,
    Get,
    Put,
    Delete,
    Flow,
    Params,
    Query,
    Body
} from "koa-ts-controllers";
import authorization from "../middlewares/authorization";
import {Context} from 'koa';
import {
    GetCardsQuery,
    PostAddCardBody,
    PutUpdateCardBody,
    getAndValidateBoardListCard
} from '../validators/BoardListCard';
import {
    getAndValidateBoardList
} from '../validators/BoardList'
import {BoardListCard as BoardListCardModel} from '../models/BoardListCard';
import {Comment as CommentModel} from '../models/Comment';
import {CardAttachment as CardAttachmentModel} from '../models/CardAttachment';
import {Attachment as AttachmentModel} from '../models/Attachment';
import configs from '../configs';


@Controller('/card')
@Flow([authorization])
export class BoardListCardController {

    /**
     * 创建新卡片
     */
    @Post('')
    public async addCard(
        @Ctx() ctx: Context,
        @Body() body: PostAddCardBody
    ) {
        let {boardListId, name, description} = body;

        await getAndValidateBoardList(boardListId, ctx.userInfo.id);

        let boarListCard = new BoardListCardModel();
        boarListCard.userId = ctx.userInfo.id;
        boarListCard.boardListId = boardListId;
        boarListCard.name = name;
        boarListCard.description = boarListCard.description || '';

        await boarListCard.save();

        ctx.status = 201;
        return boarListCard;
    }

    /**
     * 获取卡片列表
     */
    @Get('')
    public async getCards(
        @Ctx() ctx: Context,
        @Query() query: GetCardsQuery
    ) {
        let {boardListId} = query;

        await getAndValidateBoardList(boardListId, ctx.userInfo.id);

        let boardListCards = await BoardListCardModel.findAll({
            where: {
                boardListId
            },
            order: [['id', 'asc']],
            include: [
                {
                    model: CommentModel,
                    attributes: ['id']
                },
                {
                    model: CardAttachmentModel,
                    include: [
                        {
                            model: AttachmentModel
                        }
                    ]
                }
            ]
        });

        let boardListCardsData = boardListCards.map( (card: BoardListCardModel) => {
            // 处理附件的路径和封面
            let coverPath = '';
            let attachments = card.attachments.map( attachment => {
                let data = attachment.toJSON() as CardAttachmentModel & {path: string};
                data.path = configs.storage.prefix + '/' + data.detail.name;

                if (data.isCover) {
                    coverPath = data.path;
                }

                return data;
            } );

            return {
                id: card.id,
                userId: card.userId,
                boardListId: card.boardListId,
                name: card.name,
                description: card.description,
                order: card.order,
                createdAt: card.createdAt,
                updatedAt: card.updatedAt,
                attachments: attachments,
                coverPath: coverPath,
                commentCount: card.comments.length
            }
        } );

        return boardListCardsData;
    }

    /**
     * 获取一个卡片信息
     */
    @Get('/:id(\\d+)')
    public async getCard(
        @Ctx() ctx: Context,
        @Params('id') id: number
    ) {
        let boardListCard = await getAndValidateBoardListCard(id, ctx.userInfo.id);

        return boardListCard;
    }

    /**
     * 更新一个卡片信息
     */
    @Put('/:id(\\d+)')
    public async putCard(
        @Ctx() ctx: Context,
        @Params('id') id: number,
        @Body() body: PutUpdateCardBody
    ) {
        let {boardListId, name, description, order} = body;

        let boardListCard = await getAndValidateBoardListCard(id, ctx.userInfo.id);

        boardListCard.boardListId = boardListId || boardListCard.boardListId;
        boardListCard.name = name || boardListCard.name;
        boardListCard.description = description || boardListCard.description;
        boardListCard.order = order || boardListCard.order;

        await boardListCard.save();

        ctx.status = 204;
        return;
    }

    /**
     * 删除一个卡片信息
     */
    @Delete('/:id(\\d+)')
    public async deleteCard(
        @Ctx() ctx: Context,
        @Params('id') id: number
    ) {
        let boardListCard = await getAndValidateBoardListCard(id, ctx.userInfo.id);

        await boardListCard.destroy();

        ctx.status = 204;
        return;
    }

}