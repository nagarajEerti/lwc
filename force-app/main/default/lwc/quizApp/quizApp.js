import { LightningElement } from 'lwc';

export default class QuizApp extends LightningElement {
    selectedAns = {};
    correctAnss = 0;
    submitted  = false;
    myQuestions = [
        {
            id: "Question1",
            question: "Which one  is not a template iterator ?",
            options: { a: "for:each", b: "iterator:", c: "map loop" },
            correctAns: 'c'
        },
        {
            id: "Question2",
            question: "Which of the file is invalid in lwc folder",
            options: { a: ".apex", b: ".svg", c: ".js" },
            correctAns: 'a'
        },
        {
            id: "Question3",
            question: "Which of the following is not a directive",
            options: { a: "for:each", b: "if:true:", c: "@track" },
            correctAns: 'c'
        }
    ]
    get allSelected() {
        return !(Object.keys(this.selectedAns).length === this.myQuestions.length);
        // return !(Object.keys(this.selectedAns.length) === this.myQuestions.length);
        // return true
    }
    get isScoredFull(){
        return `slds-text-heading_large ${this.myQuestions.length === this.correctAnss ? 'slds-text-color_success':'slds-text-color_error'}`;
    }
    changeHandler(event) {
        const { name, value } = event.target;
        this.selectedAns = { ...this.selectedAns, [name]: value }
        let test = this.template.querySelectorAll('.radio')
         console.log(test,"hii")
         test.style.border='1px solid red';
        //setting vales      to this            format like this
        //example            {"question1":a}
    }
    submitHandler(e) {
        e.preventDefault();
         
        let correct = this.myQuestions.filter(item => this.selectedAns[item.id] === item.correctAns);
        this.correctAnss = correct.length;
        console.log("this.correctAnss", this.correctAnss)
        this.submitted=true;
    }
    resetHandler() {
        this.selectedAns = {};
        this.correctAnss = 0;
        this.submitted = false;
    }
}