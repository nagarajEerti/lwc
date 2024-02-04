import { LightningElement, wire } from 'lwc';
import CONTACT_OBJECT from '@salesforce/schema/Contact'
import { getListUi } from 'lightning/uiListApi';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const COLS = [ 
    { label: "Id", fieldName: "Id" },
    { label: "Name", fieldName: "Name" },
    { label: "Title", fieldName: "Title" },
    { label: "Phone", fieldName: "Phone", editable: true },
    { label: "Email", fieldName: "Email", type: "email", editable: true },
    {
        label: 'Action',
        type: 'button',
        initialWidth: 135,
        typeAttributes: {
            label: 'Click Me',
            title: 'Click to perform an action',
            name: 'actionButton',
            value: 'clickAction',
            variant: 'brand',
            
        }
    }
]
export default class WireListUiForUpdate extends LightningElement {
    contacts = [];
    columns = COLS;
    draftValues = [];
    @wire(getListUi, { objectApiName: CONTACT_OBJECT.objectApiName, listViewApiName: "AllContacts" })
    listViewHandler({ error, data }) {
        if (error) {
            console.error(error);
        }
        if (data) {
            console.log(data,"hii");
            console.log("naaaaaaani")
            this.contacts = data.records.records.map((item) => {
                return {
                    "Id": this.getValue(item, "Id"),
                    "Name": this.getValue(item, "Name"),
                    "Title": this.getValue(item, "Title"),
                    "Phone": this.getValue(item, "Phone"),
                    "Email": this.getValue(item, "Email")
                }
            });
            console.log(this.contacts, "for data table")
        }
    }
    handleButtonClick(row){
        // console.log(row.Name,row.Phone,row.Title,row.Email,"MDL")
        const updatedRow = { Id: row.Id, Phone: "108" };

        // Use LDS to update the record
        updateRecord({ fields: updatedRow })
            .then((result) => {
                // Update the local data array to reflect the change
                this.contacts = this.contacts.map(item => (item.Id === row.Id ? { ...item, ...updatedRow } : item));
                this.showToast('Success!!', `contact  'Phone' updated with is ${result.fields.Phone.value}`)

                console.log('Record updated successfully',result.fields.Phone.value);
            })
            .catch(error => {
                console.error('Error updating record', error);
            });
    }
    handleRowAction(event) {
        const action = event.detail.action;
        const row = event.detail.row;

        if (action.name === 'actionButton') {
            // Handle button click action
            this.handleButtonClick(row);
        }
    }
    getValue(data, field) {
        return data.fields[field].value
    }
    handleSave(event) {
        console.log(event, "handle save event")
        const recordInputs = event.detail.draftValues.map(draft => {
            const fields = { ...draft }
            return { fields: fields }
        })

        const promises = recordInputs.map(recordInput => updateRecord(recordInput));
        console.log(promises,88)
        Promise.all(promises)
            .then(() => {
                console.log("contacts updated ")
                this.draftValues = [];
            })
            .catch((err) => {
                console.error(err, "data table error")
            })
    }
    showToast(title, message, variant){
        this.dispatchEvent(new ShowToastEvent({
            title,
            message,
            variant:variant || 'success'
        }))
    }
}