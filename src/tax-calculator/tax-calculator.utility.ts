import { Injectable } from "@nestjs/common";

@Injectable()
export class Calculator {

    checkIfAmtGreaterThanZero(ammount: number): boolean {
        if (ammount > 0)
            return true;
        return false;
    }

    calculatePercantValue(value: number, percent: number): number {
        return value * (percent / 100);
    }
}