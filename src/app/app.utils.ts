import * as tenants from './tenant.config';

export class AppUtils{
    public host: string;
    public tablePrefix: string;

    constructor(){
        const hn = window.location.hostname + '';
        this.host = hn;
        console.log('UTILS: ', this.host, tenants.tenants[this.host]);
        this.tablePrefix = tenants.tenants[this.host].databasePrefix;
        console.log('GlobalTablePrefix: ' + this.tablePrefix);
    }
}