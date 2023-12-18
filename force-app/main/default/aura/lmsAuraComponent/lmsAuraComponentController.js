({
    handleMsg: function (component, message) {
        if (message != null && message.getParam('lmsData') != null) {
            component.set('v.messageReceive', message.getParam('lmsData').value)
        }
    },
    inputHandler: function (component, event) {
        console.log(event.target.value,"hii")
        component.set('v.messageValue', event.target.value);
    },
    publishMessage: function (component, event) {
        let msg = component.get('v.messageValue')
        let message = {
            lmsData: {
                value: msg
            }
        }
        component.find('SampleMessageChannel').publish(message)
    }
})
