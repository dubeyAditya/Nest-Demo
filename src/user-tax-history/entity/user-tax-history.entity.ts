import { BaseEntity, Entity, Column, ObjectIdColumn } from "typeorm";
import { ObjectID } from "mongodb";

@Entity()
export class TaxHistory extends BaseEntity{

    @ObjectIdColumn()
    id: ObjectID;
    
    @Column()
    userId: number;
    
    @Column()
    result: number;
    
    @Column()
    year: number;
    
    @Column()
    yearlySalary : number;
    
    @Column()
    taxFreeInvestment : number;
    
    @Column()
    age : number;

}