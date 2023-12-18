import { LightningElement, wire } from 'lwc';
import getAccountListWithSearch from '@salesforce/apex/AccountController.getAccountListWithSearch';
export default class ApexLwcSearchWithName extends LightningElement {

accountList=[];
searchKey='';
    onSearchHandler(event) {
        this.searchKey = event.target.value;
        getAccountListWithSearch(event.target.value)
            .then(result => {
            this.accountList = result;
            })
            .catch(err => {
                console.error(err)
            })

    }
}