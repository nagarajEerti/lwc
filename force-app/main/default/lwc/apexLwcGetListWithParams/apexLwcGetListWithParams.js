import { LightningElement, wire ,track} from 'lwc';
import getAccountListWithFilter from '@salesforce/apex/AccountController.getAccountListWithFilter';
export default class ApexLwcGetListWithParams extends LightningElement {
    accountType = 'null';
    @wire(getAccountListWithFilter, { type: '$accountType' })
    accountListWithFilter

    get accountTypes() {
        return [
            { label: 'Customer - Direct', value: 'Customer - Direct' },
            { label: 'Customer - Channel', value: 'Customer - Channel' }
        ]
    }
    onTypeHandle(event) {
        this.accountType = event.target.value;
        console.log(event.target.value, "type")
    }
}