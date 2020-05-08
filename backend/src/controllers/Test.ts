import {
    Controller,
    Get
} from 'koa-ts-controllers';

@Controller('/test')
class TestController {

    @Get('/hello')
    async hello() {
        return 'Hello Test!';
    }

}