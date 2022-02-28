import * as c from "./canvas.js"
import * as dom from "./dom.js"
import {eventListener as listen, startUp as start, bind, animate, forAll} from "./listeners.js"

const circle = {
    stroke: "white",
    lineWidth: 10
}

let rects = []

listen("window", "resize", c.fitScreen)

listen("#add_color", "click", (e) =>{
    if(rects.length >= 6){
        return
    }
    let temp = {
        stroke: "white",
        centered: true,
        lineWidth: 2,
        rotation: 0,
        currentRotation: Math.floor(Math.random() * 360),
        drawFuncs: []
    }
    bind(temp, 'size', () => c.divide('min',  10))
    bind(temp, 'rotation', () => temp.currentRotation++)

    temp.input = dom.createElementAtPos("input", 0, 0)
    temp.input.type = "color"
    temp.input.value = c.randomColor()

    bind(temp, 'fill', () => temp.input.value)

    temp.drawFuncs.push((args) => {
        dom.moveElementToPos(
            args.input, 
            args.x - (dom.getWidth(args.input)/2), 
            args.y - (dom.getHeight(args.input)/2)
        )
    })

    rects.push(temp)
})

listen("canvas", "click", (e) => {
    let point = {
        x: e.clientX,
        y: e.clientY
    }

    rects.forEach((rect, index) => {
        if(c.isPointInsideRect(rect, point)){
            rect.input.remove()
            rects.splice(index, 1)
        }
    })
})



start(() => {
    bind(circle, 'x', () => c.divide('width', 2))
    bind(circle, 'y', () => c.divide('height', 2))
    bind(circle, 'diameter', () => c.divide('min', 8/7))

    c.fitScreen()

    animate(draw)
})

function draw(){
    c.distributeAroundCircle(circle, rects)
    
    c.background("black")
    c.drawCircle(circle)

    const lines = c.getLinesToConnectAll(
        rects, 
        rects, 
        {
            stroke: "white",
            lineWidth: 3,
            drawFuncs: [
                (args) => {
                    let theta = Math.atan((args.y2 - args.y1) / (args.x2 - args.x1))
                    let length = c.getDist(args.x1, args.y1, args.x2, args.y2)
                    c.drawText({
                        text: getColorContrastRatio(args.originalArgs[0].fill, args.originalArgs[1].fill).toFixed(2),
                        x: (args.x1 + args.x2) / 2,
                        y: (args.y1 + args.y2) / 2,
                        piRotation: theta,
                        xRotationOffset: (length / 2) - c.divide('min', 7),
                        xCentered: true,
                        height: c.divide('min',  20),
                        fill: "white"
                    })
                }
            ]
        }
    )

    forAll(lines, c.drawLine)
    forAll(rects, c.drawRect)
}

function getColorContrastRatio(hexColor1, hexColor2){
    const lum1 = getLuminance(hexColor1)
    const lum2 = getLuminance(hexColor2)

    if(lum1 > lum2){
        return (lum1 + 0.05) / (lum2 + 0.05)
    }
    return (lum2 + 0.05) / (lum1 + 0.05)
}

function getLuminance(hexColor){
    const R8bit = parseInt(hexColor.substring(1, 3), 16)
    const G8bit = parseInt(hexColor.substring(3, 5), 16)
    const B8bit = parseInt(hexColor.substring(5), 16)

    const RsRGB =  R8bit / 255
    const GsRGB =  G8bit / 255
    const BsRGB =  B8bit / 255

    let R = 0
    let G = 0
    let B = 0

    if(RsRGB <= 0.03928){
        R = RsRGB / 12.92
    }else{
        R = Math.pow( ((RsRGB+0.055)/1.055) , 2.4)
    }

    if(GsRGB <= 0.03928){
        G = GsRGB / 12.92
    }else{
        G = Math.pow( ((GsRGB+0.055)/1.055) , 2.4)
    }

    if(BsRGB <= 0.03928){
        B = BsRGB / 12.92
    }else{
        B = Math.pow( ((BsRGB+0.055)/1.055) , 2.4)
    }

    return (0.2126 * R) + (0.7152 * G) + (0.0722 * B)
}