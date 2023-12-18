import { LightningElement } from 'lwc';

export default class C2pModelComponent extends LightningElement {

    closeHandler() {
        const event = new CustomEvent('close', {
            bubbles: true,
            detail: {
                message: "model closed!"
            }
        });

        this.dispatchEvent(event);
    }
    footerHandler() {
        console.log("footer handler called")
    }

}