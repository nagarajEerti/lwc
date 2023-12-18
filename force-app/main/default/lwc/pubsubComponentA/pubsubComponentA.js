import { LightningElement } from 'lwc';
import pubsub from 'c/pubsub';
export default class PubsubComponentA extends LightningElement {
    message;
    inputHandler(e) {
      this.message= e.target.value;
    }
    publishHandler(){
        pubsub.publish('componentA',this.message)
    }
}