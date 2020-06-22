import {
    Controller,
    Ctx,
    Post,
    Get,
    Put,
    Delete,
    Flow,
    Params,
    Body
} from 'koa-ts-controllers';
import {Context} from 'koa';
import authorization from "../middlewares/authorization";
import {Board as BoardModel} from '../models/Board';
import {PostAddBoardBody, PutUpdateBoardBody, getAndValidateBoard} from '../validators/Board';

@Controller('/board')
@Flow([authorization])
export class BoardController {

    /**
     * 创建新面板
     */
    @Post('')
    public async addBoard(
        @Ctx() ctx: Context,
        @Body() body: PostAddBoardBody
    ) {
        let {name} = body;

        let board = new BoardModel();

        board.name = name;
        board.userId = ctx.userInfo.id;
        await board.save();

        ctx.status = 201;
        return board;
    }

    /**
     * 获取当前登录用户的所有看板
     */
    @Get('')
    public async getBoards(
        @Ctx() ctx: Context
    ) {
        let where = {
            userId: ctx.userInfo.id
        };

        let boards = await BoardModel.findAll({where});

        return boards;
    }

    /**
     * 获取当前登录用户指定的一个看板的详情
     */
    @Get('/:id(\\d+)')
    public async getBoard(
        @Ctx() ctx: Context,
        @Params('id') id: number
    ) {

        let board = await getAndValidateBoard(id, ctx.userInfo.id);

        return board;

    }

    /**
     * 更新指定的看板
     */
    @Put('/:id(\\d+)')
    public async updateBoard(
        @Ctx() ctx: Context,
        @Params('id') id: number,
        @Body() body: PutUpdateBoardBody
    ) {
        let board = await getAndValidateBoard(id, ctx.userInfo.id);

        // 更新
        board.name = body.name || board.name;
        await board.save();

        ctx.status = 204;
    }

    /**
     * 删除指定的面板
     */
    @Delete('/:id(\\d+)')
    public async deleteBoard(
        @Ctx() ctx: Context,
        @Params('id') id: number
    ) {
        let board = await getAndValidateBoard(id, ctx.userInfo.id);

        await board.destroy();

        ctx.status = 204;
    }

}


