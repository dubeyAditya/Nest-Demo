import {TypeOrmModuleOptions} from '@nestjs/typeorm';

export const typrOrmConfig : TypeOrmModuleOptions = {
//mongodb+srv://:/
    type :'mongodb',
    //host : 'cluster0-k1sxb.mongodb.net',
    url:'mongodb+srv://adubey:nest_123@cluster0-k1sxb.mongodb.net/test?retryWrites=true&w=majority', 
    //port : 27017,
    //username :'adubey',
    //password : 'nest_123',
    //database : 'test',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    entities : [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize : false,
    logging: ["query"]
}