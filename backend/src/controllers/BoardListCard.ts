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
        boarListCard.description = boarListCard.description;

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
            order: [['id', 'asc']]
        });

        return boardListCards;
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