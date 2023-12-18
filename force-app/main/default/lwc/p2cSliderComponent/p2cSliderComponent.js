import { LightningElement, api, track } from 'lwc';

export default class P2cSliderComponent extends LightningElement {
    @track val = 20;


    onChangeValue(e) {
        this.val = e.target.value;
    }
    @api reset() {
        this.val = 50;
    }
}