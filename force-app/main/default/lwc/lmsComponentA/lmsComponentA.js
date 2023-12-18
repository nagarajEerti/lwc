import { LightningElement, wire } from 'lwc';
import SAMPLEMC from '@salesforce/messageChannel/SampleMessageChannel__c';
import { APPLICATION_SCOPE, MessageContext, publish, subscribe } from 'lightning/messageService'
export default class LmsComponentA extends LightningElement {
    inputValue;
    @wire(MessageContext)
    context;
    newReceivedData

    connectedCallback() {
        this.subscribeXComponent()
    }

    inputHandler(e) {
        this.inputValue = e.target.value;
    }

    publishMessage() {
        const message = {
            lmsData: {
                value: this.inputValue
            }
        }
        publish(this.context, SAMPLEMC, message);
    }
    subscribeXComponent() {
        subscribe(this.context, SAMPLEMC, (data) => this.handleMessage(data), { scope: APPLICATION_SCOPE })
    }

    handleMessage(message) {
        console.log(message)
        this.newReceivedData = message.propsData.value ? message.propsData.value : " u haven't got any message";
    }
}