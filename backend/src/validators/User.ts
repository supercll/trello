import {
    Length,
    IsNotEmpty
} from 'class-validator';
import {IsSameValue} from './CustomValidationDecorators';

export class RegisterBody {

    @Length(1, 50, {
        message: '用户名不能为空或者大于50个字符'
    })
    name: string;

    @IsNotEmpty({
        message: '密码不能为空'
    })
    password: string;

    // 需要和password比较，必须拥有相同的值，自定义验证装饰器
    @IsSameValue('password', {
        message: '两次输入密码不一致'
    })
    rePassword: string;

}