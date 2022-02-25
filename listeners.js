let animationFuncs = []
function looping(){
    animationFuncs.forEach( element => {
        element()
    })
    window.requestAnimationFrame(looping)
}

export function eventListener(query, event, func){

    // validate inputs
    if(typeof query != "string"){
        console.error("Invalid value for query", query)
    }
    if(typeof event != "string"){
        console.error("Invalid value for event", event)
    }
    if(typeof func != "function"){
        console.error("Invalid value for func", func)
    }

    // window events
    if(query == 'window'){
        window.addEventListener(event, func)
    }

    // query events
    document.querySelectorAll(query).forEach(element => {
        element.addEventListener(event, func)
    })
}

export function startUp(func){
    document.addEventListener("DOMContentLoaded", func);
}

export function forAll(thingsToDraw, func){
    thingsToDraw.forEach(element => {
        func(element)
    });
}

export function animate(func){
    animationFuncs.push(func)
    if(animationFuncs.length == 1){
        looping()
    }
}

export function bind(objectToBind, propToBind, func){
    Object.defineProperty(objectToBind, propToBind, {
        get(){
            return func()
        }
    })
    return func()
}