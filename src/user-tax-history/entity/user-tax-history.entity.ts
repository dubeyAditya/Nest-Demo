import { BaseEntity, Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export class TaxHistory extends BaseEntity{

    @PrimaryColumn()
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