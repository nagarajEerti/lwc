import { LightningElement, wire } from 'lwc';
import id from '@salesforce/user/Id';
import { getRecord } from 'lightning/uiRecordApi';
export default class WireAdapterDemo extends LightningElement {
    userId = id
    userDetails

    @wire(getRecord, { recordId: '$userId', fields: ['User.Name', 'User.Email'] })
    userDetailsHandler({ data, error }) {
        if (data) {
            this.userDetails = data.fields
        }
        if (error) {
            console.error(error)
        }
    }

    @wire(getRecord, { recordId: '$userId', fields: ['User.Name', 'User.Email'] })
    userDetailsProperty
}