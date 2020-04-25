export class ResponseDto<T>{
    constructor(){
        this.statusCode = 200;
        this.error = '';
        this.message = '';
    }
    statusCode: number;
    message: string;
    error: string ;
    data: T;
}