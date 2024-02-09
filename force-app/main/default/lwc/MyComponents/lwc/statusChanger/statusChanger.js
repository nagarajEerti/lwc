import { LightningElement, track, wire } from 'lwc';
import BOOK_OBJECT from '@salesforce/schema/Book__c'
import { getListUi } from 'lightning/uiListApi';
import { refreshApex } from '@salesforce/apex';
import { createRecord, deleteRecord, updateRecord } from 'lightning/uiRecordApi';
const COLS = [
    { label: "Id", fieldName: "Id" },
    { label: "Name", fieldName: "Name", editable: true },
    // { label: "Title", fieldName: "Title" },
    // { label: "Phone", fieldName: "Phone", editable: true },
    { label: "isReaded", fieldName: "isReaded__c", type: 'boolean', editable: true },
    {
        label: 'Action',
        type: 'button',
        initialWidth: 135,
        typeAttributes: {
            label: { fieldName: 'ButtonLabel' },
            title: 'Create new Book',
            name: 'actionButton',
            value: 'clickAction',
            variant: { fieldName: 'ButtonColor' },

        }
    },
    {
        label: 'Delete',
        type: 'button',
        initialWidth: 135,
        typeAttributes: {
            label: "Delete",
            title: 'Click to delete row',
            name: 'delete',
            value: 'clickAction',
            variant: "destructive",

        }
    }
]
export default class StatusChanger extends LightningElement {

    allEmployees = [];
    error = ''
    columns = COLS;
    draftValues = [];
    newBook = false;
    formFields = {};
    employeeData;
    
    @wire(getListUi, { objectApiName: BOOK_OBJECT.objectApiName, listViewApiName: "All" })
    fetchAllEmployees(result) {
        this.employeeData = result
        if (result.error) {
            console.log(error)
        }
        if (result.data) {
            console.log(result.data, "new emps data")
            this.allEmployees = result.data.records.records.map(emp => {
                return {
                    "Name": this.getValue(emp, "Name"),
                    "Id": this.getValue(emp, "Id"),
                    "isReaded__c": this.getValue(emp, "isReaded__c"),
                    "ButtonLabel": this.getValue(emp, "isReaded__c") ? "Unread" : "Readed",
                    "ButtonColor": this.getValue(emp, "isReaded__c") ? "destructive" : "brand",
                }
            })

        }
    }
    // getAllEmployees({ error, data }) {
    //     if (error) {
    //         console.log(error)
    //     }
    //     if (data) {
    //         console.log(data, "new emps data")
    //         this.allEmployees = data.records.records.map(emp => {
    //             return {
    //                 "Name": this.getValue(emp, "Name"),
    //                 "Id": this.getValue(emp, "Id"),
    //                 "isReaded__c": this.getValue(emp, "isReaded__c"),
    //                 "ButtonLabel": this.getValue(emp, "isReaded__c") ? "Unread" : "Readed",
    //                 "ButtonColor": this.getValue(emp, "isReaded__c") ? "destructive" : "brand",
    //             }
    //         })
    //     }
    // }

    newBookHandler() {
        this.newBook = !this.newBook
    }
    bookInputHandler(event) {
        let { name, value, } = event.target;
        this.formFields[name] = value;
        name == 'isReaded__c' ? this.formFields[name] = event.target.checked : null;
    }
    createNewBook() {
        createRecord({ apiName: BOOK_OBJECT.objectApiName, fields: this.formFields })
            .then((result) => {
                this.formFields = {};
                this.template.querySelector('form.createBook').reset();
                this.loadData();
                this.newBook = !this.newBook
            })
            .catch((err) => {
                console.log("new Book err",)
            })
    }
    getValue(data, field) {
        return data.fields[field].value
    }
    handleRowAction(event) {
        const action = event.detail.action;
        const row = event.detail.row

        if (action.name == 'actionButton') {
            this.handleButtonClick(row);

        }
        if (action.name == 'delete') {
            this.deleteHandle(row);
            console.log("delete function")

        }
    }
    async deleteHandle(row) {
        try {
            let result = deleteRecord(row.Id)
            console.log(result, "delete row try")
        }
        catch (err) {
            console.log(err, "error in delete")
        }
    }
    handleButtonClick(row) {
        const updatedRow = { "Id": row.Id, "isReaded__c": !row.isReaded__c }
        updateRecord({ fields: updatedRow })
            .then(result => {
                console.log(result, "result")
                this.allEmployees = this.allEmployees.map(item => (item.Id == row.Id ? { ...item, ...updatedRow } : item))
            })
            .catch((err) => {
                console.log(err, "err", 70)
            })
    }
    handleSave(event) {
        console.log(event, "handle save event", event.detail.draftValues)
        const recordInputs = event.detail.draftValues.map(draft => {
            const fields = { ...draft }
            return { fields: fields }
        })
        const promises = recordInputs.map(recordInput => updateRecord(recordInput));

        Promise.all(promises)
            .then((result) => {
                console.log("book updated ", result)
                this.draftValues = [];
            })
            .catch((err) => {
                console.error(err, "data table error")
            })

    }
    loadData() {
        console.log("Refresh the wired data");
        return refreshApex(this.employeeData);
    }

}