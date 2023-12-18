import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
    name
    msg
    nameHandler(event) {
        this.name = event.target.value;
    }

    onHitHandler(event) {
        console.log("hit EVent in parent")
        this.msg = event.detail.msg;


    }
}  