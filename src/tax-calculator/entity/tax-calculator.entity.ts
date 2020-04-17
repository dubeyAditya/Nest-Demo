import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"

@Entity()
export class AgeCriterial extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number;
    @Column()
    age : number;
    @Column()
    ammountToDeduct : number;
}

@Entity()
export class CessCriterial extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number;
    @Column()
    taxAmmountLimit : number;
    @Column()
    percentCess : number;
}

@Entity()
export class TaxRules extends BaseEntity{

    @PrimaryGeneratedColumn()
    id : string;
    
    @Column()
    salaryRangeCriteria : Map<number,number>;
    
    @Column()
    year : number;
    
    @Column()
    taxFreeLimit :number;

    @OneToOne(type =>AgeCriterial)
    @JoinColumn()
    ageRangeCriterial : AgeCriterial;

    @OneToOne(type =>CessCriterial)
    @JoinColumn()
    cessCriteria : CessCriterial;
    
    
}

