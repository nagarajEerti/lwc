import { LightningElement } from 'lwc';
import pubsub from 'c/pubsub';
export default class PubsubComponentB extends LightningElement {
    message
    connectedCallback() {
        this.callSubscribe()
    }
    callSubscribe() {
        pubsub.subscribe('componentA', (msg) => {
            this.message = msg;
        });
    }
}