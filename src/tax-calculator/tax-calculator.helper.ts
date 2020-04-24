import { Injectable } from "@nestjs/common";
import { AgeCriterial, CessCriterial } from "./entity/tax-calculator.entity";
import { Calculator } from "./tax-calculator.utility";

@Injectable()
export class TaxCalculatorServiceHelper{
    constructor(private calculator : Calculator){}

    calculateNetTaxableIncome(ammount: number,taxFreeLimit:number):number{
        return ammount - taxFreeLimit;
    }

    applyAgeReduction(ammount:number,ageCriteria :AgeCriterial,age:number):number{
        if(age>=ageCriteria.age)
            ammount=ammount - ageCriteria.ammountToDeduct;
        
        return ammount;
    }

    applySalaryRangeReduction(ammount:number,salaryRangeCriteria : Map<number,number>):number{
        let taxAmmount  = 0 ;
        salaryRangeCriteria.forEach((value:number,key:number)=>{
            if(ammount<key){
               taxAmmount+= this.calculator.calculatePercantValue(ammount,value);
            }else{
                ammount = ammount - key;
                taxAmmount+= this.calculator.calculatePercantValue(key,value);
            }

            if(!this.calculator.checkIfAmtGreaterThanZero(ammount))
                return taxAmmount;    
        });

        return taxAmmount;
    }

    checkAndApplyCess(taxAmmount : number ,cessCriteria :CessCriterial):number{
        if(taxAmmount>cessCriteria.taxAmmountLimit){
            taxAmmount += this.calculator.calculatePercantValue(taxAmmount,cessCriteria.percentCess);
        }
        return taxAmmount;
    }
}