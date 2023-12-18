import { LightningElement, api } from 'lwc';

export default class LwcAuraCommunication extends LightningElement {
    @api title

    callAura() {
        console.log("event method called")
        const event = new CustomEvent('sending', {
            detail: {
                "message": "hii we are from lwc"
            }
        })
        this.dispatchEvent(event);
    }

}