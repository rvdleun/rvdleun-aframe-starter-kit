AFRAME.registerState({
    initialState: {
        debugMode: false,

        computeState: function (newState) {},

        handlers: {
            activateDebugMode: function(state) {
                state.debugMode = true;
            },

            disableDebugMode: function(state) {
                state.debugMode = false;
            }
        }
    }
});
