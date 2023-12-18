import { LightningElement } from 'lwc';

export default class ShadowDomStyling extends LightningElement {
    isLoaded = false;
    renderedCallback() {
        
        if (this.isLoaded) return
        const style = document.createElement('style');
        style.innerHTML = `c-shadow-dom-styling .slds-button{
            background:blue;
            color:black;
        }`
        this.template.querySelector('lightning-button').appendChild(style);
        this.isLoaded = true;
    }
}