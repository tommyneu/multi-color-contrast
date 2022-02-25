import {eventListener as listen} from "./listeners.js"

let cdx = document.getElementById("screen")
let ctx = cdx.getContext("2d")
let height = window.innerHeight
let width = window.innerWidth


export function fitScreen(){
    height = window.innerHeight
    width = window.innerWidth
    cdx.height = height
    cdx.width = width
}

export function background(color){
    ctx.fillStyle = color
    ctx.fillRect(0, 0, width, height)
}

export function randomColor(){
    const r = Math.floor(Math.random() * 255)
    const g = Math.floor(Math.random() * 255)
    const b = Math.floor(Math.random() * 255)

    return `RGB(${r}, ${g}, ${b})`
}
export function randomAlphaColor(){
    const r = Math.floor(Math.random() * 255)
    const g = Math.floor(Math.random() * 255)
    const b = Math.floor(Math.random() * 255)
    const a = Math.random()

    return `RGBA(${r}, ${g}, ${b}, ${a})`
}

export function divide(direction, devisor = 1){

    // sets the case to lower
    direction = direction.toLowerCase()

    // determines which size to divide against
    if(direction == "width"){
        return width / devisor
    }
    if(direction == "height"){
        return height / devisor
    }

    // determines which way is is the min/max and sets it
    if(direction == "min"){
        if( height < width ){
            return divide('height', devisor)
        }
        return divide('width', devisor)
    }
    if(direction == "max"){
        if( height > width ){
            return divide('height', devisor)
        }
        return divide('width', devisor)
    }

    // returns 0 if done
    return 0
}

export function lineWidth(lineWidth){

    // validates input
    if(typeof lineWidth == "int" && lineWidth <= 0){
        console.error("Invalid lineWidth value", lineWidth)
        return
    }

    // sets the line width
    ctx.lineWidth = lineWidth
}

export function drawCircle(args){
    let deepArgs = {}

    // sets default values
    deepArgs.x = args.x || 10
    deepArgs.y = args.y || 10
    deepArgs.radius = args.radius || args.diameter / 2 || 10
    deepArgs.fill = args.fill || 'RGBA(0, 0, 0, 0)'
    deepArgs.stroke = args.stroke || 'RGBA(0, 0, 0, 0)'
    deepArgs.lineWidth = args.lineWidth || 1

    // resizes circle if there is a stroke
    if(deepArgs.stroke != 'RGBA(0, 0, 0, 0)'){
        deepArgs.r -= deepArgs.lineWidth
    }

    //validate inputs
    if(typeof deepArgs.x == "int"){
        console.error("Invalid x value", deepArgs.x)
        return
    }
    if(typeof deepArgs.y == "int"){
        console.error("Invalid y value", deepArgs.y)
        return
    }
    if(typeof deepArgs.radius == "int" && deepArgs.radius <= 0){
        console.error("Invalid r value", deepArgs.radius)
        return
    }

    // sets the colors
    ctx.strokeStyle = deepArgs.stroke
    ctx.fillStyle = deepArgs.fill
    ctx.lineWidth = deepArgs.lineWidth

    // draw circle
    ctx.beginPath()
    ctx.arc(deepArgs.x, deepArgs.y, deepArgs.radius, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.fill()
}

export function drawRect(args){
    let deepArgs = {}

    // sets default values
    deepArgs.x = args.x || 10
    deepArgs.y = args.y || 10
    deepArgs.width = args.size || args.width || 10
    deepArgs.height = args.size || args.height || 10
    deepArgs.fill = args.fill || 'RGBA(0, 0, 0, 0)'
    deepArgs.stroke = args.stroke || 'RGBA(0, 0, 0, 0)'
    deepArgs.centered = args.centered || false
    deepArgs.lineWidth = args.lineWidth || 1
    deepArgs.rotation = args.rotation || 0


    // resizes circle if there is a stroke
    if(deepArgs.stroke != 'RGBA(0, 0, 0, 0)'){
        deepArgs.width -= deepArgs.lineWidth
        deepArgs.height -= deepArgs.lineWidth
    }

    // if centered it will move the points over
    if(deepArgs.centered){
        deepArgs.x -= deepArgs.width / 2
        deepArgs.y -= deepArgs.height / 2
    }

    //validate inputs
    if(typeof deepArgs.x == "int"){
        console.error("Invalid x value", deepArgs.x)
        return
    }
    if(typeof deepArgs.y == "int"){
        console.error("Invalid y value", deepArgs.y)
        return
    }
    if(typeof deepArgs.width == "int" && deepArgs.width <= 0){
        console.error("Invalid width value", deepArgs.width)
        return
    }
    if(typeof deepArgs.height == "int" && deepArgs.height <= 0){
        console.error("Invalid height value", deepArgs.height)
        return
    }

    // sets the colors
    ctx.fillStyle = deepArgs.fill
    ctx.strokeStyle = deepArgs.stroke
    ctx.lineWidth = deepArgs.lineWidth

    // rotates the canvas centered on the center of rect
    ctx.translate(deepArgs.x + (deepArgs.width / 2), deepArgs.y + (deepArgs.height / 2));
    ctx.rotate(deepArgs.rotation * Math.PI / 180);
    ctx.translate(-1 * (deepArgs.x + (deepArgs.width / 2)), -1 * (deepArgs.y + (deepArgs.height / 2)));

    // draw rectangle
    ctx.fillRect(deepArgs.x, deepArgs.y, deepArgs.width, deepArgs.height)
    ctx.strokeRect(deepArgs.x, deepArgs.y, deepArgs.width, deepArgs.height)

    // rotates the canvas back
    ctx.translate(deepArgs.x + (deepArgs.width / 2), deepArgs.y + (deepArgs.height / 2));
    ctx.rotate(-1 * (deepArgs.rotation * Math.PI / 180));
    ctx.translate(-1 * (deepArgs.x + (deepArgs.width / 2)), -1 * (deepArgs.y + (deepArgs.height / 2)));
}

export function drawLine(args){
    let deepArgs = {}

    // sets default values
    deepArgs.x1 = args.x1 || 10
    deepArgs.y1 = args.y1 || 10
    deepArgs.x2 = args.x2 || 10
    deepArgs.y2 = args.y2 || 10
    deepArgs.stroke = args.stroke || 'RGBA(0, 0, 0, 0)'
    deepArgs.lineWidth = args.lineWidth || 1

    // sets the colors
    ctx.fillStyle = deepArgs.fill
    ctx.strokeStyle = deepArgs.stroke
    ctx.lineWidth = deepArgs.lineWidth

    ctx.beginPath()
    ctx.moveTo(deepArgs.x1, deepArgs.y1)
    ctx.lineTo(deepArgs.x2, deepArgs.y2)
    ctx.stroke()
}



export function getLinesToConnectAll(things1, things2, sharedArgs){
    let lines = []
    for(const item1 of things1){
        for(const item2 of things2){
            lines.push({
                ...sharedArgs, 
                x1: item1.x, 
                y1: item1.y,
                x2: item2.x,
                y2: item2.y
            })
        }
    }
    return lines
}

export function distributeAroundCircle(circle, thingsToDist){
    let deepArgs = {}

    deepArgs.x = circle.x || 10
    deepArgs.y = circle.y || 10
    deepArgs.radius = circle.radius || circle.diameter / 2 || 10

    thingsToDist.forEach((element, index)=> {
        element.x = (Math.sin((Math.PI * 2 * index) / thingsToDist.length) * deepArgs.radius) + deepArgs.x
        element.y = (Math.cos((Math.PI * 2 * index) / thingsToDist.length) * deepArgs.radius) + deepArgs.y
    })
}

export function isPointInsideCircle(circle, point){
    let deepArgs = {}

    deepArgs.x = circle.x || 10
    deepArgs.y = circle.y || 10
    deepArgs.radius = circle.radius || circle.diameter / 2 || 10

    deepArgs.pointX = point.x || 1
    deepArgs.pointY = point.y || 1

    let xDist = deepArgs.x - deepArgs.pointX
    let yDist = deepArgs.y - deepArgs.pointY
    let dist = Math.sqrt((xDist*xDist) + (yDist*yDist))

    return dist <= deepArgs.radius
}

export function isPointInsideRect(rect, point){
    let deepArgs = {}

    deepArgs.x = rect.x || 10
    deepArgs.y = rect.y || 10
    deepArgs.width = rect.size || rect.width || 10
    deepArgs.height = rect.size || rect.height || 10
    deepArgs.centered = rect.centered || false
    deepArgs.rotation = rect.rotation || 0

    // if centered it will move the points over
    if(deepArgs.centered){
        deepArgs.x -= deepArgs.width / 2
        deepArgs.y -= deepArgs.height / 2
    }


    deepArgs.pointX = point.x || 1
    deepArgs.pointY = point.y || 1

    // rotates the canvas centered on the center of rect
    ctx.translate(deepArgs.x + (deepArgs.width / 2), deepArgs.y + (deepArgs.height / 2));
    ctx.rotate(deepArgs.rotation * Math.PI / 180);
    ctx.translate(-1 * (deepArgs.x + (deepArgs.width / 2)), -1 * (deepArgs.y + (deepArgs.height / 2)));

    ctx.beginPath()
    ctx.rect(deepArgs.x, deepArgs.y, deepArgs.width, deepArgs.height)

    let isPointInPath = ctx.isPointInPath(deepArgs.pointX, deepArgs.pointY)

    ctx.closePath()

    // rotates the canvas centered on the center of rect
    ctx.translate(deepArgs.x + (deepArgs.width / 2), deepArgs.y + (deepArgs.height / 2));
    ctx.rotate(-1 * (deepArgs.rotation * Math.PI / 180));
    ctx.translate(-1 * (deepArgs.x + (deepArgs.width / 2)), -1 * (deepArgs.y + (deepArgs.height / 2)));

    return isPointInPath
}

