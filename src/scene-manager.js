const emptyFunction = () => {};
const registeredSceneControllers = [];
const scenes = [];

let currentScene = null;
let parameters = {};

function getRouteCommands(route) {
    if (route[0] === "/") {
        route = route.substring(1);
    }

    return route.split("/");
}

function getRouteParameters(route, compareRoute) {
    parameters = {};

    const routeCommands = getRouteCommands(route);
    const compareCommands = getRouteCommands(compareRoute);

    if (routeCommands.length !== compareCommands.length) {
        return false;
    }

    for (let i = 0; i < compareCommands.length; i++) {
        if (compareCommands[i][0] === ':') {
            const id = compareCommands[i].substring(1);
            parameters[id] = routeCommands[i];
        } else if(routeCommands[i] !== compareCommands[i]) {
            console.log('Not the same', routeCommands[i], '!==', compareCommands[i], i);
            return false;
        }
    }

    return true;
}

AFRAME.navigateToScene = function(route) {
    const newScene = scenes.find(scene => getRouteParameters(route, scene.route));
    
    if (!newScene) {
        console.error('Unknown route for new scene: ', route);
        return false;
    }

    if (currentScene) {
        currentScene.onExit();
        currentScene.el.setAttribute("visible", false);
    }

    window.location.hash = route;

    currentScene = newScene;
    currentScene.el.setAttribute("visible", true);
    currentScene.onEnter({ parameters });

    return true;
};

AFRAME.registerSceneController = function(selector, options) {
    registeredSceneControllers.push({ selector, options });
}

AFRAME.initialiseScenes = function(options) {
    registeredSceneControllers.forEach(({ selector, options}) => {
        const el = document.querySelector(selector);

        if (!el) {
            console.error(`Tried to register a scene, but could not find ID ${id}`);
            return;
        }
    
        el.setAttribute('visible', false);
    
        const { 
            onEnter,
            onExit,
        } = options;
    
        scenes.push({
            ...options,
            el,
            onEnter: onEnter || emptyFunction,
            onExit: onExit || emptyFunction
        });
    });

    function navigateToHash() {
        const { defaultRoute } = options;
        const route = window.location.hash ? window.location.hash.substring(1) : defaultRoute;
        
        AFRAME.navigateToScene(route) || AFRAME.navigateToScene(defaultRoute);
    }

    window.addEventListener('hashchange', () => {
        navigateToHash();
    });

    navigateToHash();
}