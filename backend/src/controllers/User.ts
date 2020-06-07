import {
    Controller,
    Post,
    Body,
    Ctx
} from 'koa-ts-controllers';
import {Context} from 'koa';
import {RegisterBody} from '../validators/User';
import {User as UserModel} from '../models/User';
import Boom from '@hapi/Boom';

@Controller('/user')
export class UserController {

    /**
     * 用户注册
     */
    @Post('/register')
    async register(
        @Ctx() ctx: Context,
        @Body() body: RegisterBody
    ) {
        let {name, password} = body;

        // 验证数据库中是否已经存在要注册的用户
        let user = await UserModel.findOne({
            where: {
                name
            }
        });

        if (user) {
            throw Boom.conflict('注册失败', '用户名已经被注册了');
        }

        let newUser = new UserModel();
        newUser.name = name;
        newUser.password = password;

        await newUser.save();

        ctx.status = 201;
        return {
            id: newUser.id,
            name: newUser.name,
            createdAt: newUser.createdAt
        }

    }

}