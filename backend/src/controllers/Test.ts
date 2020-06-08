import {
    Controller,
    Get,
    Params,
    Query,
    Body,
    Post,
    Header,
    Ctx,
    Flow
} from 'koa-ts-controllers';
import {Context} from 'koa';
import {IsNumberString, IsNotEmpty} from 'class-validator';
import Boom from '@hapi/Boom';
import authorization from '../middlewares/authorization';

class GetUsersQuery {

    @IsNumberString({
        message: 'page必须是数字'
    })
    page: number;

}

class PostUserBody {

    @IsNotEmpty({
        message: '用户名不能为空'
    })
    name: string;

    @IsNotEmpty({
        message: '密码不能为空'
    })
    password: string;

}

@Controller('/test')

class TestController {

    // @Get('/hello')
    // async hello(a: any) {
    //
    //     // console.log(a.b);
    //
    //     return 'Hello Test!';
    // }

    // @Get('/user/:id(\\d+)')
    // async getUser(
    //     @Params('id') id: number
    // ) {
    //     return '当前params中的用户id是：' + id;
    // }

    // @Get('/user')
    // async getUser2(
    //     @Query() q: {id: number}
    // ) {
    //     return '当前params中的用户id是：' + q.id;
    // }

    @Post('/user')
    async postUser(
        @Ctx() ctx: Context,
        @Body() body: PostUserBody,
        @Header() h: any
    ) {
        // console.log(body);
        // console.log('header', h);
        // return `当前提交的数据是：${JSON.stringify(body)}`;

        ctx.status = 201;
        return {
            id: 1,
            name: body.name,
            createAt: new Date()
        }

    }


    @Get('/users')
    async getUsers(
        @Query() q: GetUsersQuery
    ) {

        // 业务逻辑出现了一些错误，比如用户不存在，用户名已经被注册了
        // if (true) { // 用户名已经被注册了
        //     throw Boom.notFound('注册失败', '用户已经被注册了');
        // }

        return '传过来的query：' + JSON.stringify(q);
    }

    @Get('/auth')
    @Flow([authorization])
    async auth(
        @Ctx() ctx: Context
    ) {
        return '不登录看不到';
    }

    @Get('/noauth')
    async noAuth() {
        return '随便看';
    }
    

}