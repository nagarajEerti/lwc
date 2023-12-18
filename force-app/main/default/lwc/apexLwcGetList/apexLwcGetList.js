import { LightningElement, wire } from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList'
export default class ApexLwcGetList extends LightningElement {



    accountsList
    @wire(getAccountList)
    listOfAccounts({ error, data }) {
        if (error) {
            console.error(error);
        }
        if (data) {
            console.log(data, "Accounts List");
            // this.accountsList = data;
            this.accountsList = data.map((item) => {
                let newItem = item.Type === 'Customer - Channel' ? 'Channel' : item.Type == 'Customer - Direct' ? 'Direct' : '-----';
                return { ...item, newItem }
            })
        }
    }

}