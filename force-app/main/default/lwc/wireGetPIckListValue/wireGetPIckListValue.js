import { LightningElement, track, wire } from 'lwc';
import { getObjectInfo, getPicklistValues,getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry'
import TYPE_FIELD from '@salesforce/schema/Account.Type'
import Account_Object from '@salesforce/schema/Account';

export default class WireGetPIckListValue extends LightningElement {

    @wire(getObjectInfo, { objectApiName: Account_Object })
    objectInfo
    pickListValues
    typeOptions
    selectedType
    @track value
    ratingOptions
    selectedRating

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: INDUSTRY_FIELD })
    industryPickList({ err, data }) {
        if (err) {
            console.error(err)
        } if (data) {
            console.log(data, "INDUSTRY_FIELD")
            this.pickListValues = data.values;
            // this.options = [...this.generatePickListValues(data)]
        }
    }
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: TYPE_FIELD })
    typePickList({ err, data }) {
        if (err) {
            console.error(err)
        } if (data) {
            console.log(data, "TYPE_FIELD")
            this.typeOptions = [...this.generatePickListValues(data)]
        }
    }

    // get all pick list fields from object based on record type 
     @wire(getPicklistValuesByRecordType,{objectApiName:Account_Object,recordTypeId:'$objectInfo.data.defaultRecordTypeId'})
     pickListHandler({error , data}){
        if(error){
            console.error(error,"error")
            
        }
        if(data){
            console.log(data,"All pick lists")
            this.ratingOptions = [...this.generatePickListValues(data.picklistFieldValues.Rating)]
        }
     }
     
     
    generatePickListValues(data) {
        return data.values.map(item => ({ label: item.label, value: item.value }))
    }
    get options() {
        return pickListValues;
    }
    
    handleChange(event) {
        this.value = event.detail.value;
    }

    typeHandleChange(event) {
        this.selectedType = event.detail.value;
    }
    ratingHandleChange(event) {
        this.selectedRating = event.detail.value;
    }
    
}