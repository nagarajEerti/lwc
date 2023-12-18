import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import { getRecord,getFieldValue } from 'lightning/uiRecordApi';
import { LightningElement, wire, api } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Account.Name'
import OWNER_NAME_FIELD from '@salesforce/schema/Account.Owner.Name'
import ANNUAL_REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue'

export default class WireGetRecord extends LightningElement {
    @api recordId
    name
    owner
    annualRevenue
    @wire(getRecord, { recordId: '$recordId', fields: [NAME_FIELD, OWNER_NAME_FIELD, ANNUAL_REVENUE_FIELD] })
    accountHandler({ error, data }) {
        if (data) {
            console.log(data)
        }
        if (error) {
            console.log(error)
        }
    }


    @wire(getRecord, { recordId: '$recordId', layoutTypes: ['Full'], modes: ['View'] })
    accountHandler({ error, data }) {
        if (data) {
            console.log(data)
            // this.name = data.fields.Name.displayValue ? data.fields.Name.displayValue : data.fields.Name.value
            // this.owner = data.fields.Owner.displayValue ? data.fields.Owner.displayValue : data.fields.Owner.value
            // this.annualRevenue = data.fields.AnnualRevenue.displayValue ? data.fields.AnnualRevenue.displayValue : data.fields.AnnualRevenue.value



            this.name = getFieldValue(data,NAME_FIELD);
            this.owner = getFieldValue(data,OWNER_NAME_FIELD)
            this.annualRevenue = getFieldValue(data,ANNUAL_REVENUE_FIELD)
        }
        if (error) {
            console.log(error)
        }
    }
}