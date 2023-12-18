({
    showMessage: function (component, event, helper) {

        var msg = event.getParams('message');
        component.set('v.message', msg)
    }
})
