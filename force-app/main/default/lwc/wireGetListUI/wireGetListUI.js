import { LightningElement, wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact'
import NAME_FIELD from '@salesforce/schema/Contact.Name'
export default class WireGetListUI extends LightningElement {

    contacts
    pageToken = null;
    nextPageToken
    previousPageToken
    @wire(getListUi, {
        objectApiName: CONTACT_OBJECT,
        listViewApiName: 'AllContacts',
        pageSize: 10,
        sortBy: NAME_FIELD,
        pageToken: '$pageToken'

    })
    allContacts({ error, data }) {
        if (error) {
            console.log(error)
        }
        if (data) {
            console.log(data, "All contacts")
            this.nextPageToken = data.records.nextPageToken
            this.previousPageToken = data.records.previousPageToken
            this.contacts = data.records.records;
        }
    }

    handleNextPage() {
        this.pageToken = this.nextPageToken;
    }
    handlePreviousPage() {
        this.pageToken = this.previousPageToken;
    }

}