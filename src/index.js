import 'aframe';
import './scene-manager';

setTimeout(() => {
    AFRAME.registerSceneController("#red", {
        onEnter: ({ parameters }) => { console.log('Entering red', parameters.id) },
        onExit: () => { console.log('Exiting red') },
        route: "/red/:id",
    });
    
    AFRAME.registerSceneController("#green", {
        onEnter: () => { console.log('Entering green') },
        onExit: () => { console.log('Exiting green') },
        route: "/green",
    });
    
    AFRAME.registerSceneController("#blue", {
        onEnter: () => { console.log('Entering blue') },
        onExit: () => { console.log('Exiting blue') },
        route: "/blue",
    });

    AFRAME.initialiseScenes({
        defaultRoute: "/red/12"
    });
});
