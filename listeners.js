let animationFuncs = []
function looping(){
    animationFuncs.forEach( element => {
        element()
    })
    window.requestAnimationFrame(looping)
}

export function eventListener(query, event, func){

    // validate inputs
    if(typeof query != "string" && !(query instanceof Element || query instanceof HTMLDocument )){
        console.error("Invalid value for query", query)
        return
    }
    if(typeof event != "string"){
        console.error("Invalid value for event", event)
        return
    }
    if(typeof func != "function"){
        console.error("Invalid value for func", func)
        return
    }

    // window events
    if(query == 'window'){
        window.addEventListener(event, func)
        return
    }

    if(query instanceof Element || query instanceof HTMLDocument){
        query.addEventListener(event, func)
        return
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

export function clamp(value, args){
    if(args.min && args.max){
        return Math.min(Math.max(value, args.min), args.max)
    }
    if(args.min){
        return Math.max(value, args.min)
    }
    if(args.max){
        return Math.min(value, args.max)
    }
    return value
}