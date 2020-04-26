import { BaseEntity, Entity, Column, ObjectIdColumn } from "typeorm";

@Entity()
export class AgeCriterial extends BaseEntity {
    @ObjectIdColumn()
    id: number;
    @Column()
    age: number;
    @Column()
    ammountToDeduct: number;
}

@Entity()
export class CessCriterial extends BaseEntity {
    @ObjectIdColumn()
    id: number;
    @Column()
    taxAmmountLimit: number;
    @Column()
    percentCess: number;
}

@Entity()
export class SalaryRangeCriteria extends BaseEntity {
    @ObjectIdColumn()
    id: number;

    @Column()
    lowerLimit: number;

    @Column()
    upperLimit: number;

    @Column()
    pecentageDeduction: number;
}


@Entity()
export class TaxRules extends BaseEntity {

    @ObjectIdColumn()
    id: number;

    @Column(type => SalaryRangeCriteria)
    salaryRangeCriteria: SalaryRangeCriteria[];

    @Column()
    year: number;

    @Column()
    taxFreeLimit: number;

    @Column(type => AgeCriterial)
    ageRangeCriterial: AgeCriterial;

    @Column(type => CessCriterial)
    cessCriteria: CessCriterial;


}

