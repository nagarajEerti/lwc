import { LightningElement } from 'lwc';

export default class C2pParentComponent extends LightningElement {
    showModel = false;
    msg
    showHandler() {
        this.showModel = true;
    }
    closeHandler(event) {
        this.msg = event.detail.message;
        this.showModel = false;
    }
}
