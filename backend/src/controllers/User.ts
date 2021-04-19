import { Controller, Post, Body, Ctx, Get } from 'koa-ts-controllers';
import { Context } from 'koa';
import { RegisterBody, LoginBody, UserBody } from '../validators/User';
import { User, User as UserModel } from '../models/User';
import { BoardListCard as BoardListCardModel } from '../models/BoardListCard';
import Boom from '@hapi/boom';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import configs from '../configs';
import day from 'dayjs';
import { Json } from 'sequelize/types/lib/utils';

@Controller('/user')
export class UserController {
  /**
   * 用户注册
   */
  @Post('/register')
  async register(@Ctx() ctx: Context, @Body() body: RegisterBody) {
    let { name, password } = body;

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
    };
  }

  /**
   * 登录
   */
  @Post('/login')
  async login(@Ctx() ctx: Context, @Body() body: LoginBody) {
    let { name, password } = body;

    let user = await UserModel.findOne({
      where: { name }
    });

    if (!user) {
      throw Boom.notFound('登录失败', '用户不存在');
    }

    let md5 = crypto.createHash('md5');
    password = md5.update(password).digest('hex');
    if (password !== user.password) {
      throw Boom.forbidden('登录失败', '密码错误');
    }

    let userInfo = {
      id: user.id,
      name: user.name
    };

    let token = jwt.sign(userInfo, configs.jwt.privateKey);
    ctx.set('authorization', token);

    return userInfo;
  }

  /**
   * 获取用户所有卡片信息
   */
  @Get('/getTotalCard')
  async getTotalCard(@Ctx() ctx: Context) {
    const { id } = ctx.userInfo;

    const cards: {
      rows: Array<BoardListCardModel>;
      count: number;
    } = await BoardListCardModel.findAndCountAll({
      where: { userId: id }
    });

    const totalCard = cards.rows.map(card => {
      const { id, status, createdAt, updatedAt, name } = card;
      return {
        cardName: name,
        cardId: id,
        status,
        createdAt,
        updatedAt
      };
    });

    const doneCard = totalCard
      .filter(card => card.status)
      .map(card => {
        const { updatedAt } = card;
        const doneTime = day(updatedAt).format('YYYY-MM-DD');
        return {
          ...card,
          doneTime
        };
      });

    const doneTimeTotalMap: Map<String, number> = new Map();
    const doneTimeTotal: Array<[String, Number]> = [];

    doneCard.forEach(item => {
      const time = item.doneTime;
      const cnt = doneTimeTotalMap.get(time);

      cnt ? doneTimeTotalMap.set(time, cnt + 1) : doneTimeTotalMap.set(time, 1);
    });
    doneTimeTotalMap.forEach((value, key) => {
      doneTimeTotal.push([key, value]);
    });
    const res = {
      totalCardNumber: cards.count,
      doneCardNumber: doneCard.length,
      totalCard,
      doneCard,
      doneTimeTotal
    };

    return JSON.stringify(res);
  }
}
