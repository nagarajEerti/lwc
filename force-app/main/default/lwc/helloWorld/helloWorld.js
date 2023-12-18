import { LightningElement,api,track } from 'lwc';

export default class HelloWorld extends LightningElement {
    @track number 
    @track flag = true
    @track name = 'nani'

    students = [
        {
            id:1,
            name:"shiva",
            class:"1st"
        },
        {
            id:2,
            name:"naga",
            class:"1st"
        },
        {
            id:3,
            name:"raju",
            class:"1st"
        },
        {
            id:4,
            name:"uma",
            class:"1st"
        }
    ]
    handleClick(){
       this.number = Math.round(Math.random() * 10);
    }
    onChangeHandler(event){
       this.name = event.target.value;
    }
    get isEven(){
     return this.number % 2 === 0;
    }
}