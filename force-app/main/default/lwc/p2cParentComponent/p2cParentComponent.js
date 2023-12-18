import { LightningElement } from 'lwc';

export default class P2cParentComponent extends LightningElement {
    percentageValue
    carousalData = [
        {
            src: "https://www.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg",
            header: "First Card",
            description: "First card description.",
            alternativeText: "first card accessible description.",
            href: "javascript:void(0);"
        },
        {
            src: "https://www.lightningdesignsystem.com/assets/images/carousel/carousel-02.jpg",
            header: "Second Card",
            description: "Second card description.",
            alternativeText: "second card accessible description.",
            href: "javascript:void(0);"
        },
        {
            src: "https://www.lightningdesignsystem.com/assets/images/carousel/carousel-03.jpg",
            header: "Third Card",
            description: "Third card description.",
            alternativeText: "third card accessible description.",
            href: "javascript:void(0);"
        },
    ]
    percentageHandler(e) {
        this.percentageValue = e.target.value;
    }
    resetSlider() {
        console.log("slider rested method called")
        this.template.querySelector('c-p2c-slider-component').reset();
    }
}