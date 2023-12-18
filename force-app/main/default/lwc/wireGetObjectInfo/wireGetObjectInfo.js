import { LightningElement, wire } from 'lwc';
import { getObjectInfo, getObjectInfos } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import CASE_OBJECT from '@salesforce/schema/Case';

export default class WireGetObjectInfo extends LightningElement {

    objectInfo
    objectInfos
    objects = [ACCOUNT_OBJECT, CASE_OBJECT]

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    objectDetails({ err, data }) {
        if (err) {
            console.error(err)
        }
        if (data) {
            this.objectInfo = data.apiName
            console.log(data)
        }
    }

    @wire(getObjectInfos, { objectApiNames: '$objects' })
    objectDetails({ err, data }) {
        if (err) {
            console.error(err)
        }
        if (data) {
            this.objectInfos = data
            console.log(data,"hiii")
        }
    }
}