export interface Rule {
    code: string;
    type: string;
    values: any;
}

export interface RuleDatabaseAdapter {
    getRuleByCode: Function;
    addRule: Function;
}