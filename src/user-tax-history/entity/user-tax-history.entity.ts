import { BaseEntity, Entity, Column, ObjectIdColumn } from "typeorm";

@Entity()
export class TaxHistory extends BaseEntity{

    @ObjectIdColumn()
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