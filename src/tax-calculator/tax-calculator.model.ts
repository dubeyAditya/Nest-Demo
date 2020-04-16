export class TaxRules{

    id : string;
    salaryRangeCriteria : Map<number,number>;
    year : number;
    ageRangeCriterial : AgeCriterial;
    cessCriteria : CessCriterial;
    taxFreeLimit :number;
}

export class AgeCriterial{
    age : number;
    ammountToDeduct : number;
}


export class CessCriterial{
    taxAmmountLimit : number;
    percentCess : number;
}
