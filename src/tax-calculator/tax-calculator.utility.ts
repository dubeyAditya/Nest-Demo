import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class Calculator {
    private logger;
    constructor(){
        this.logger = new Logger('Calculator');
    }

    checkIfAmtGreaterThanZero(ammount: number): boolean {
        this.logger.debug(`Ammount ${ammount}`);
        if (ammount > 0)
            return true;
        return false;
    }

    calculatePercantValue(value: number, percent: number): number {
        this.logger.debug(`Value ${value} Percent ${percent}`);
        const result =value * (percent / 100);
        this.logger.debug(`Percent ${result}`);
        return result;
    }
}