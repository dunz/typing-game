import {TotalReport} from './types/types';

export class Store {
    public totalReport: TotalReport;

    constructor() {
        this.init();
    }

    public init(): void {
        this.totalReport = {
            score: 0,
            averageSecond: 0
        };
    }
}

export default new Store();