import { LightningElement, wire } from 'lwc';
import SAMPLEMC from '@salesforce/messageChannel/SampleMessageChannel__c';
import { subscribe, MessageContext, APPLICATION_SCOPE, unsubscribe, publish } from 'lightning/messageService';

export default class LmsComponentX extends LightningElement {

    @wire(MessageContext)
    context
    receivedMessage
    // subscription
    connectedCallback() {
        this.subscribeMessage();
    }
    subscribeMessage() {
        subscribe(this.context, SAMPLEMC, (message) => {
            this.handleMessage(message)
        }, { scop: APPLICATION_SCOPE })
        console.log("subscribed")
    }
    publishMessage() {
        console.log("message published")
        const message = {
            propsData: {
                value: "hi nani how are u "
            }
        }
        publish(this.context, SAMPLEMC, message);
    }

    unSubscribeMsg() {
        console.log("un subscribed")
        // unsubscribe(this.subscription);
        // this.subscription = null;
    }


    handleMessage(message) {
        console.log("got message", message)
        this.receivedMessage = message.lmsData.value ? message.lmsData.value : "No message published";
    }
}