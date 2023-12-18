import { LightningElement, wire } from 'lwc';
import CONTACT_OBJECT from '@salesforce/schema/Contact'
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class WireCeateRecord extends LightningElement {
    formFeilds = {};



    changeHandler(event) {
        const { name, value } = event.target;
        this.formFeilds[name] = value;
    }
    createContact() {
        const recordInput = { apiName: CONTACT_OBJECT.objectApiName, fields: this.formFeilds };
        createRecord(recordInput)
            .then((contact) => {
                this.showToast('record Created', `Contact record created ${contact.id}`,)
                console.log(`Contact record created ${contact.id}`)
                this.template.querySelector('form.createFrom').reset();
                this.formFeilds = {};
            })
            .catch((err) => {
                this.showToast('record not Created', "noo", 'error')
                console.error(err)
            })
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({
            title, message, variant: variant || 'success'
        }))
    }

}