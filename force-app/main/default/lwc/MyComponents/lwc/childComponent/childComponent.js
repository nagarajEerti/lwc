import { LightningElement, api } from 'lwc';

export default class ChildComponent extends LightningElement {
    @api name

    hitHandler(){
       let event = new CustomEvent('hit',{
        bubbles:true,
        detail:{
            msg:"hiii im from child component"
        }
       })
       console.log("hit EVent in chaild")
       this.dispatchEvent(event);
    }
}