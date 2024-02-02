import { LightningElement, wire } from 'lwc';
import EMPLOYEES_OBJECT from '@salesforce/schema/SFDC_Employee__c'
import { getListUi } from 'lightning/uiListApi';

export default class StatusChanger extends LightningElement {

    allEmployees = []
    error
    @wire(getListUi, { objectApiName: EMPLOYEES_OBJECT.objectApiName,listViewApiName:"All" })
    allEmployees({ error, data }) {
        if (error) {
            console.log(error)
        }
        else{
            // console.log(data,"new emps data")
            this.allEmployees = data.records.records.map(emp=>{
                return {
                    "Name":this.getValue(emp,"Name"),
                    "Id" :this.getValue(emp,"Id"),
                }
            })            
        }
    }


    getValue(data, field) {
        return data.fields[field].value
    }

}