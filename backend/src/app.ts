import configs from './configs';
import Koa from 'koa';


const app = new Koa();


app.listen( configs.server.port, configs.server.host, () => {
    console.log(`服务启动成功：http://${configs.server.host}:${configs.server.port}`);
} )