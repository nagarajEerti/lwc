import getAccountListWithSearch from '@salesforce/apex/AccountController.getAccountListWithSearch';
import { LightningElement } from 'lwc';

export default class ApexLwcWithSearchKeyWord extends LightningElement {
    accountList = [];
    searchKey = '';
    timer = '';


    onSearchHandler(event) {
        window.clearTimeout(this.timer);
        this.searchKey = event.target.value;
        this.timer = setTimeout(() => {
            this.callApex();
        }, 1000)

        //     getAccountListWithSearch({serchkey:this.searchKey})
        //         .then(result => {
        //         this.accountList = result;
        //         })
        //         .catch(err => {
        //             console.error(err)
        //         })
        // }



    }

    callApex() {
        getAccountListWithSearch({ serchkey: this.searchKey })
            .then(result => {
                this.accountList = result;
            })
            .catch(err => {
                console.error(err)
            })
    }
}