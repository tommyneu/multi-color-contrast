import {eventListener as listen} from "./listeners.js"

let cdx = document.getElementById("screen")
let ctx = cdx.getContext("2d")
let height = window.innerHeight
let width = window.innerWidth

export function sizeScreen(xSize, ySize){

    // validate inputs
    if(typeof xSize != "number" || xSize <= 0){
        console.error("Invalid xSize value", xSize)
        return
    }
    if(typeof ySize != "number" || ySize <= 0){
        console.error("Invalid ySize value", ySize)
        return
    }

    // changes the size of the canvas
    height = ySize
    width = xSize
    cdx.height = height
    cdx.width = width
}

export function fitScreen(){

    //changes the size of the canvas
    height = window.innerHeight
    width = window.innerWidth
    cdx.height = height
    cdx.width = width
}

export function background(color){

    // validate input
    if(typeof color != "string"){
        console.error("Invalid color value", color)
        return
    }

    // fills background with color
    ctx.fillStyle = color
    ctx.fillRect(0, 0, width, height)
}

export function randomColor(){

    // generates random color values
    let r = Math.floor(Math.random() * 255).toString(16).padStart(2, '0')
    let g = Math.floor(Math.random() * 255).toString(16).padStart(2, '0')
    let b = Math.floor(Math.random() * 255).toString(16).padStart(2, '0')

    // returns color
    return `#${r}${g}${b}`
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
    if(typeof lineWidth == "number" && lineWidth <= 0){
        console.error("Invalid lineWidth value", lineWidth)
        return
    }

    // sets the line width
    ctx.lineWidth = lineWidth
}

export function drawCircle(args){

    if(typeof args != "object"){
        console.error("Invalid args value", args)
        return
    }

    let deepArgs = {}

    // sets default values
    deepArgs.x = args.x || 10
    deepArgs.y = args.y || 10
    deepArgs.radius = args.radius || args.diameter / 2 || 10
    deepArgs.fill = args.fill || 'RGBA(0, 0, 0, 0)'
    deepArgs.stroke = args.stroke || 'RGBA(0, 0, 0, 0)'
    deepArgs.lineWidth = args.lineWidth || 1
    deepArgs.drawFuncs = args.drawFuncs || []

    // resizes circle if there is a stroke
    if(deepArgs.stroke != 'RGBA(0, 0, 0, 0)'){
        deepArgs.r -= deepArgs.lineWidth
    }

    //validate inputs
    if(typeof deepArgs.x != "number"){
        console.error("Invalid x value", deepArgs.x)
        return
    }
    if(typeof deepArgs.y != "number"){
        console.error("Invalid y value", deepArgs.y)
        return
    }
    if(typeof deepArgs.radius != "number" || deepArgs.radius <= 0){
        console.error("Invalid r value", deepArgs.radius)
        return
    }
    if(typeof deepArgs.fill != "string"){
        console.error("Invalid fill value", deepArgs.fill)
        return
    }
    if(typeof deepArgs.stroke != "string"){
        console.error("Invalid stroke value", deepArgs.stroke)
        return
    }
    if(typeof deepArgs.lineWidth != "number" || deepArgs.lineWidth <= 0){
        console.error("Invalid lineWidth value", deepArgs.lineWidth)
        return
    }
    if(deepArgs.drawFuncs.constructor.name != "Array"){
        console.error("Invalid drawFuncs value", deepArgs.drawFuncs)
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

    deepArgs.drawFuncs.forEach((func) => {
        func(args)
    })
}

export function drawRect(args){

    if(typeof args != "object"){
        console.error("Invalid args value", args)
        return
    }

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
    deepArgs.rotation = args.rotation || args.piRotation * (180/Math.PI) || 0
    deepArgs.xRotationOffset = args.xRotationOffset || 0
    deepArgs.yRotationOffset = args.yRotationOffset || 0
    deepArgs.drawFuncs = args.drawFuncs || []

    //validate inputs
    if(typeof deepArgs.x != "number"){
        console.error("Invalid x value", deepArgs.x)
        return
    }
    if(typeof deepArgs.y != "number"){
        console.error("Invalid y value", deepArgs.y)
        return
    }
    if(typeof deepArgs.width != "number" || deepArgs.width <= 0){
        console.error("Invalid width value", deepArgs.width)
        return
    }
    if(typeof deepArgs.height != "number" || deepArgs.height <= 0){
        console.error("Invalid height value", deepArgs.height)
        return
    }
    if(typeof deepArgs.fill != "string"){
        console.error("Invalid fill value", deepArgs.fill)
        return
    }
    if(typeof deepArgs.stroke != "string"){
        console.error("Invalid stroke value", deepArgs.stroke)
        return
    }
    if(typeof deepArgs.centered != "boolean"){
        console.error("Invalid centered value", deepArgs.centered)
        return
    }
    if(typeof deepArgs.lineWidth != "number" || deepArgs.lineWidth <= 0){
        console.error("Invalid lineWidth value", deepArgs.lineWidth)
        return
    }
    if(typeof deepArgs.rotation != "number"){
        console.error("Invalid rotation value", deepArgs.rotation)
        return
    }
    if(typeof deepArgs.xRotationOffset != "number"){
        console.error("Invalid xRotationOffset value", deepArgs.xRotationOffset)
        return
    }
    if(typeof deepArgs.yRotationOffset != "number"){
        console.error("Invalid yRotationOffset value", deepArgs.yRotationOffset)
        return
    }
    if(deepArgs.drawFuncs.constructor.name != "Array"){
        console.error("Invalid drawFuncs value", deepArgs.drawFuncs)
        return
    }


    // resizes circle if there is a stroke
    if(deepArgs.stroke != 'RGBA(0, 0, 0, 0)'){
        deepArgs.width -= deepArgs.lineWidth
        deepArgs.height -= deepArgs.lineWidth
    }

    // if centered it will move the rect numbers over
    if(deepArgs.centered){
        deepArgs.x -= deepArgs.width / 2
        deepArgs.y -= deepArgs.height / 2
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
    ctx.fillRect(deepArgs.x + deepArgs.xRotationOffset, deepArgs.y + deepArgs.yRotationOffset, deepArgs.width, deepArgs.height)
    ctx.strokeRect(deepArgs.x + deepArgs.xRotationOffset, deepArgs.y+ deepArgs.yRotationOffset, deepArgs.width, deepArgs.height)

    // rotates the canvas back
    ctx.translate(deepArgs.x + (deepArgs.width / 2), deepArgs.y + (deepArgs.height / 2));
    ctx.rotate(-1 * (deepArgs.rotation * Math.PI / 180));
    ctx.translate(-1 * (deepArgs.x + (deepArgs.width / 2)), -1 * (deepArgs.y + (deepArgs.height / 2)));

    deepArgs.drawFuncs.forEach((func) => {
        func(args)
    })
}

export function drawLine(args){

    if(typeof args != "object"){
        console.error("Invalid args value", args)
        return
    }

    let deepArgs = {}

    // sets default values
    deepArgs.x1 = args.x1 || 10
    deepArgs.y1 = args.y1 || 10
    deepArgs.x2 = args.x2 || 10
    deepArgs.y2 = args.y2 || 10
    deepArgs.stroke = args.stroke || 'RGBA(0, 0, 0, 0)'
    deepArgs.lineWidth = args.lineWidth || 1
    deepArgs.drawFuncs = args.drawFuncs || []

    if(typeof deepArgs.x1 != "number"){
        console.error("Invalid x1 value", deepArgs.x1)
        return
    }
    if(typeof deepArgs.y1 != "number"){
        console.error("Invalid y1 value", deepArgs.y1)
        return
    }
    if(typeof deepArgs.x2 != "number"){
        console.error("Invalid x2 value", deepArgs.x2)
        return
    }
    if(typeof deepArgs.y2 != "number"){
        console.error("Invalid y2 value", deepArgs.y2)
        return
    }
    if(typeof deepArgs.stroke != "string"){
        console.error("Invalid stroke value", deepArgs.stroke)
        return
    }
    if(typeof deepArgs.lineWidth != "number" || deepArgs.lineWidth <= 0){
        console.error("Invalid lineWidth value", deepArgs.lineWidth)
        return
    }
    if(deepArgs.drawFuncs.constructor.name != "Array"){
        console.error("Invalid drawFuncs value", deepArgs.drawFuncs)
        return
    }

    // sets the colors
    ctx.fillStyle = deepArgs.fill
    ctx.strokeStyle = deepArgs.stroke
    ctx.lineWidth = deepArgs.lineWidth

    // draw line
    ctx.beginPath()
    ctx.moveTo(deepArgs.x1, deepArgs.y1)
    ctx.lineTo(deepArgs.x2, deepArgs.y2)
    ctx.stroke()

    deepArgs.drawFuncs.forEach((func) => {
        func(args)
    })
}

export function drawText(args){

    if(typeof args != "object"){
        console.error("Invalid args value", args)
        return
    }

    let deepArgs = {}

    deepArgs.x = args.x || 10
    deepArgs.y = args.y || 10
    deepArgs.width = args.size || args.width || 0
    deepArgs.height = args.size || args.height || 30
    deepArgs.fill = args.fill || 'RGBA(0, 0, 0, 0)'
    deepArgs.stroke = args.stroke || 'RGBA(0, 0, 0, 0)'
    deepArgs.xCentered = args.centered || args.xCentered || false
    deepArgs.yCentered = args.centered || args.yCentered || false
    deepArgs.lineWidth = args.lineWidth || 1
    deepArgs.rotation = args.rotation || args.piRotation * (180/Math.PI) || 0
    deepArgs.xRotationOffset = args.xRotationOffset || 0
    deepArgs.yRotationOffset = args.yRotationOffset || 0
    deepArgs.font = args.font || "Arial"
    deepArgs.text = args.text || "Hello World"
    deepArgs.drawFuncs = args.drawFuncs || []

    //validate inputs
    if(typeof deepArgs.x != "number"){
        console.error("Invalid x value", deepArgs.x)
        return
    }
    if(typeof deepArgs.y != "number"){
        console.error("Invalid y value", deepArgs.y)
        return
    }
    if(typeof deepArgs.width != "number" || deepArgs.width < 0){
        console.error("Invalid width value", deepArgs.width)
        return
    }
    if(typeof deepArgs.height != "number" || deepArgs.height <= 0){
        console.error("Invalid height value", deepArgs.height)
        return
    }
    if(typeof deepArgs.fill != "string"){
        console.error("Invalid fill value", deepArgs.fill)
        return
    }
    if(typeof deepArgs.stroke != "string"){
        console.error("Invalid stroke value", deepArgs.stroke)
        return
    }
    if(typeof deepArgs.xCentered != "boolean"){
        console.error("Invalid xCentered value", deepArgs.xCentered)
        return
    }
    if(typeof deepArgs.yCentered != "boolean"){
        console.error("Invalid yCentered value", deepArgs.yCentered)
        return
    }
    if(typeof deepArgs.lineWidth != "number" || deepArgs.lineWidth <= 0){
        console.error("Invalid lineWidth value", deepArgs.lineWidth)
        return
    }
    if(typeof deepArgs.rotation != "number"){
        console.error("Invalid rotation value", deepArgs.rotation)
        return
    }
    if(typeof deepArgs.xRotationOffset != "number"){
        console.error("Invalid xRotationOffset value", deepArgs.xRotationOffset)
        return
    }
    if(typeof deepArgs.yRotationOffset != "number"){
        console.error("Invalid yRotationOffset value", deepArgs.yRotationOffset)
        return
    }
    if(typeof deepArgs.font != "string"){
        console.error("Invalid font value", deepArgs.font)
        return
    }
    if(typeof deepArgs.text != "string" || deepArgs.text == ""){
        console.error("Invalid text value", deepArgs.text)
        return
    }
    if(deepArgs.drawFuncs.constructor.name != "Array"){
        console.error("Invalid drawFuncs value", deepArgs.drawFuncs)
        return
    }


    if(deepArgs.xCentered){
        ctx.textAlign = "center"
    }else{
        ctx.textAlign = "left"
    }

    if(deepArgs.yCentered){
        ctx.textBaseline = "middle"
    }else{
        ctx.textBaseline = "alphabetic"
    }

    ctx.fillStyle = deepArgs.fill
    ctx.strokeStyle = deepArgs.stroke
    ctx.lineWidth = deepArgs.lineWidth

    // rotates the canvas centered on the center of rect
    ctx.translate(deepArgs.x, deepArgs.y);
    ctx.rotate(deepArgs.rotation * Math.PI / 180);
    ctx.translate(-1 * deepArgs.x, -1 * deepArgs.y);

    ctx.font = `${deepArgs.height}px ${deepArgs.font}`

    let xScale = 1

    if(deepArgs.width != 0){
        let measuredWidth = ctx.measureText(deepArgs.text).width
        if(measuredWidth > deepArgs.width) {
            xScale = deepArgs.width / measuredWidth
        }
    }
    ctx.save()
    ctx.scale(xScale, 1)

    ctx.fillText(deepArgs.text, (deepArgs.x + deepArgs.xRotationOffset) / xScale, deepArgs.y + deepArgs.yRotationOffset)
    ctx.strokeText(deepArgs.text, (deepArgs.x + deepArgs.xRotationOffset) / xScale, deepArgs.y + deepArgs.yRotationOffset)

    ctx.restore()

    // rotates the canvas back
    ctx.translate(deepArgs.x, deepArgs.y);
    ctx.rotate(-1 * (deepArgs.rotation * Math.PI / 180));
    ctx.translate(-1 * deepArgs.x, -1 * deepArgs.y);

    deepArgs.drawFuncs.forEach((func) => {
        func(args)
    })
}



export function getLinesToConnectAll(things1, things2, sharedArgs){

    // validate inputs
    if(things1.constructor.name != 'Array'){
        console.error("Invalid things1 array", things1)
        return
    }
    if(things2.constructor.name != 'Array'){
        console.error("Invalid things2 array", things2)
        return
    }
    if(typeof sharedArgs != "object"){
        console.error("Invalid sharedArgs value", sharedArgs)
        return
    }


    let lines = []
    for(const item1 of things1){

        // validate inputs
        if(typeof item1 != "object"){
            console.error("Invalid item value in things1", item1)
            return
        }

        for(const item2 of things2){
            if(item1.x == item2.x && item1.y == item2.y){
                continue
            }

            let filteredLines = lines.filter((singleLine) => {
                return (singleLine.x1 == item2.x) && (singleLine.y1 == item2.y) && (singleLine.x2 == item1.x) && (singleLine.y2 == item1.y)
            })
            if(filteredLines.length > 0){
                continue
            }

            // validate inputs
            if(typeof item2 != "object"){
                console.error("Invalid item value in things2", item2)
                return
            }

            let deepArgs = {}
            deepArgs.x1 = item1.x || 10
            deepArgs.y1 = item1.y || 10
            deepArgs.x2 = item2.x || 10
            deepArgs.y2 = item2.x || 10

            // validate inputs
            if(typeof deepArgs.x1 != "number"){
                console.error("Invalid x value in item in array1", deepArgs.x1)
                return
            }
            if(typeof deepArgs.y1 != "number"){
                console.error("Invalid y value in item in array1", deepArgs.y1)
                return
            }
            if(typeof deepArgs.x2 != "number"){
                console.error("Invalid x value in item in array2", deepArgs.x2)
                return
            }
            if(typeof deepArgs.y2 != "number"){
                console.error("Invalid y value in item in array2", deepArgs.y2)
                return
            }

            // creates line object and pushes it into array
            lines.push({
                ...sharedArgs, 
                x1: item1.x, 
                y1: item1.y,
                x2: item2.x,
                y2: item2.y,
                originalArgs: [
                    item1,
                    item2
                ]
            })
        }
    }

    //returns lines
    return lines
}

export function distributeAroundCircle(circle, thingsToDist){
    
    // validate inputs
    if(typeof circle != "object"){
        console.error("Invalid circle value", circle)
        return
    }
    if(thingsToDist.constructor.name != 'Array'){
        console.error("Invalid thingsToDist array", thingsToDist)
        return
    }

    let deepArgs = {}

    deepArgs.x = circle.x || 10
    deepArgs.y = circle.y || 10
    deepArgs.radius = circle.radius || circle.diameter / 2 || 10

    // validate inputs
    if(typeof deepArgs.x != "number"){
        console.error("Invalid x value", deepArgs.x)
        return
    }
    if(typeof deepArgs.y != "number"){
        console.error("Invalid y value", deepArgs.y)
        return
    }
    if(typeof deepArgs.radius != "number" || deepArgs.radius <= 0){
        console.error("Invalid radius value", deepArgs.radius)
        return
    }

    thingsToDist.forEach((element, index)=> {

        // validate inputs
        if(typeof element != "object"){
            console.error("Invalid item value in thingsToDist", element)
            return
        }

        //sets the x and y around the circle
        element.x = (Math.sin((Math.PI * 2 * index) / thingsToDist.length) * deepArgs.radius) + deepArgs.x
        element.y = (Math.cos((Math.PI * 2 * index) / thingsToDist.length) * deepArgs.radius) + deepArgs.y
    })
}

export function isPointInsideCircle(circle, point){

    // validate inputs
    if(typeof circle != "object"){
        console.error("Invalid circle value", circle)
        return
    }
    if(typeof point != 'object'){
        console.error("Invalid point value", point)
        return
    }

    let deepArgs = {}

    deepArgs.x = circle.x || 10
    deepArgs.y = circle.y || 10
    deepArgs.radius = circle.radius || circle.diameter / 2 || 10

    // validate inputs
    if(typeof deepArgs.x != "number"){
        console.error("Invalid x value", deepArgs.x)
        return
    }
    if(typeof deepArgs.y != "number"){
        console.error("Invalid y value", deepArgs.y)
        return
    }
    if(typeof deepArgs.radius != "number" || deepArgs.radius <= 0){
        console.error("Invalid radius value", deepArgs.radius)
        return
    }

    deepArgs.pointX = point.x || 1
    deepArgs.pointY = point.y || 1

    // validate inputs
    if(typeof deepArgs.pointX != "number"){
        console.error("Invalid pointX value", deepArgs.pointX)
        return
    }
    if(typeof deepArgs.pointY != "number"){
        console.error("Invalid pointY value", deepArgs.pointY)
        return
    }

    let dist = getDist(deepArgs.x, deepArgs.y, deepArgs.pointX, deepArgs.pointY)

    return dist <= deepArgs.radius
}

export function isPointInsideRect(rect, point){

    // validate inputs
    if(typeof rect != "object"){
        console.error("Invalid rect value", rect)
        return
    }
    if(typeof point != 'object'){
        console.error("Invalid point value", point)
        return
    }

    let deepArgs = {}

    deepArgs.x = rect.x || 10
    deepArgs.y = rect.y || 10
    deepArgs.width = rect.size || rect.width || 10
    deepArgs.height = rect.size || rect.height || 10
    deepArgs.centered = rect.centered || false
    deepArgs.rotation = rect.rotation || rect.piRotation * (180 / Math.PI) || 0
    deepArgs.xRotationOffset = rect.xRotationOffset || 0
    deepArgs.yRotationOffset = rect.yRotationOffset || 0

    // validate inputs
    if(typeof deepArgs.x != "number"){
        console.error("Invalid x value", deepArgs.x)
        return
    }
    if(typeof deepArgs.y != "number"){
        console.error("Invalid y value", deepArgs.y)
        return
    }
    if(typeof deepArgs.width != "number" || deepArgs.width <= 0){
        console.error("Invalid width value", deepArgs.width)
        return
    }
    if(typeof deepArgs.height != "number" || deepArgs.height <= 0){
        console.error("Invalid height value", deepArgs.height)
        return
    }
    if(typeof deepArgs.centered != "boolean"){
        console.error("Invalid centered value", deepArgs.centered)
        return
    }
    if(typeof deepArgs.rotation != "number" || deepArgs.rotation < 0){
        console.error("Invalid rotation value", deepArgs.rotation)
        return
    }
    if(typeof deepArgs.xRotationOffset != "number"){
        console.error("Invalid xRotationOffset value", deepArgs.xRotationOffset)
        return
    }
    if(typeof deepArgs.yRotationOffset != "number"){
        console.error("Invalid yRotationOffset value", deepArgs.yRotationOffset)
        return
    }

    // if centered it will move the points over
    if(deepArgs.centered){
        deepArgs.x -= deepArgs.width / 2
        deepArgs.y -= deepArgs.height / 2
    }

    deepArgs.pointX = point.x || 1
    deepArgs.pointY = point.y || 1

    // validate inputs
    if(typeof deepArgs.pointX != "number"){
        console.error("Invalid pointX value", deepArgs.pointX)
        return
    }
    if(typeof deepArgs.pointY != "number"){
        console.error("Invalid pointY value", deepArgs.pointY)
        return
    }

    // rotates the canvas centered on the center of rect
    ctx.translate(deepArgs.x + (deepArgs.width / 2), deepArgs.y + (deepArgs.height / 2));
    ctx.rotate(deepArgs.rotation * Math.PI / 180);
    ctx.translate(-1 * (deepArgs.x + (deepArgs.width / 2)), -1 * (deepArgs.y + (deepArgs.height / 2)));

    ctx.beginPath()
    ctx.rect(deepArgs.x + deepArgs.xRotationOffset, deepArgs.y + deepArgs.yRotationOffset, deepArgs.width, deepArgs.height)

    let isPointInPath = ctx.isPointInPath(deepArgs.pointX, deepArgs.pointY)

    ctx.closePath()

    // rotates the canvas centered on the center of rect
    ctx.translate(deepArgs.x + (deepArgs.width / 2), deepArgs.y + (deepArgs.height / 2));
    ctx.rotate(-1 * (deepArgs.rotation * Math.PI / 180));
    ctx.translate(-1 * (deepArgs.x + (deepArgs.width / 2)), -1 * (deepArgs.y + (deepArgs.height / 2)));

    return isPointInPath
}

export function getDist(x1, y1, x2, y2){
    let xDist = x2 - x1
    let yDist = y2 - y1
    return Math.sqrt((xDist*xDist) + (yDist*yDist))
}

