import { LightningElement } from 'lwc';
import MOMENT from '@salesforce/resourceUrl/moment';
import { loadScript } from 'lightning/platformResourceLoader'
export default class ThirdPartyFiles extends LightningElement {
    currentDate = ''
    isLoaded = false;
    renderedCallback() {
        if(this.isLoaded){
            return
        }
        else{
            Promise.all([
        loadScript(this, MOMENT)
            ])
            .then(() => {
                //success
                this.isLoaded = true;
                this.setDateOnScreen()
            })
            .catch((err) => {
                console.error(err, "err")
            })
        }
    }
    setDateOnScreen() {
        this.currentDate = moment().format('LLLL')
    }
}

let obj={
   
}