import {
    IsNotEmpty,
    MaxLength, ValidateIf
} from 'class-validator';

export class PostAddBoardBody {

    @IsNotEmpty({
        message: '面板名称不能为空'
    })
    @MaxLength(255, {
        message: '面板名称不能大于255个字符'
    })
    name: string;

}

export class PutUpdateBoardBody {

    @ValidateIf(o => o.name !== undefined)
    @MaxLength(255, {
        message: '面板名称不能大于255个字符'
    })
    name?: string

}