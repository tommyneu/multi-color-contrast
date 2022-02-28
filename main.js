import * as c from "./canvas.js"
import * as dom from "./dom.js"
import {eventListener as listen, startUp as start, bind, animate, forAll, clamp} from "./listeners.js"

const circle = {
    stroke: "white",
    lineWidth: 10
}

let rects = []

listen("window", "resize", (e) => {
    c.fitScreen()
    document.querySelectorAll("div").forEach((elem) => {
        elem.remove()
    })
})

listen("#add_color", "click", (e) =>{
    if(rects.length >= 6){
        return
    }
    
    rects.push(createRect())
})

listen("canvas", "click", (e) => {
    let point = {
        x: e.clientX,
        y: e.clientY
    }

    rects.forEach((rect) => {
        if(c.isPointInsideRect(rect, point)){
            createExample(rect)
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

    const lines = c.getLinesToConnectAll(
        rects, 
        rects, 
        {
            stroke: "white",
            lineWidth: 2,
            drawFuncs: [
                (args) => {
                    let theta = Math.atan((args.y2 - args.y1) / (args.x2 - args.x1))
                    let length = c.getDist(args.x1, args.y1, args.x2, args.y2)
                    let ratio = getColorContrastRatio(args.originalArgs[0].fill, args.originalArgs[1].fill).toFixed(2)
                    c.drawText({
                        text: ratio,
                        x: (args.x1 + args.x2) / 2,
                        y: (args.y1 + args.y2) / 2,
                        piRotation: theta,
                        xRotationOffset: (length / 2) - (args.originalArgs[0].size * 0.95),
                        xCentered: true,
                        height: args.originalArgs[0].size / 4,
                        width: args.originalArgs[0].size / 4,
                        fill: "white"
                    })
                    c.drawText({
                        text: ratio,
                        x: (args.x1 + args.x2) / 2,
                        y: (args.y1 + args.y2) / 2,
                        piRotation: theta,
                        xRotationOffset: -1 * ((length / 2) - (args.originalArgs[0].size *  0.95)),
                        xCentered: true,
                        height: args.originalArgs[0].size / 4,
                        width: args.originalArgs[0].size / 4,
                        fill: "white"
                    })
                }
            ]
        }
    )

    c.background("black")
    c.drawCircle(circle)
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

function createRect(){
    let temp = {
        id: Math.floor(Math.random() * 1000000),
        stroke: "white",
        centered: true,
        lineWidth: 2,
        drawFuncs: [],
        elements: {}
    }
    bind(temp, 'size', () => clamp(c.divide('min', 8), {min: 60}))

    temp.elements.input = dom.createElementAtPos("input", 0, 0, (elem) => {
        elem.type = "color"
        elem.value = c.randomColor()
    })
    bind(temp, 'fill', () => temp.elements.input.value)

    temp.elements.deleteButton = dom.createElementAtPos("button", 0, 0, (elem) => {
        elem.innerHTML = "❌"
        elem.dataset.index = temp.id
    })
    listen(temp.elements.deleteButton, "click", (e)=>{
        for(const singleElement in temp.elements){
            temp.elements[singleElement].remove()
        }
        rects.forEach((rect, index) => {
            if(rect.id == e.target.dataset.index){
                rects.splice(index, 1)
            }
        })
    })

    temp.elements.editButton = dom.createElementAtPos("button", 0, 0, (elem) => {
        elem.innerHTML = "✏️"
        elem.dataset.index = temp.id
    })

    listen(temp.elements.editButton, "click", (e)=>{
        temp.elements.input.click()
    })


    temp.drawFuncs.push((args) => {
        dom.moveElementToPos(
            args.elements.deleteButton, 
            args.x + (args.size / 2) - dom.getWidth(args.elements.deleteButton), 
            args.y - (args.size / 2)
        )
        dom.moveElementToPos(
            args.elements.editButton, 
            args.x + (args.size / 2) - dom.getWidth(args.elements.editButton), 
            args.y + (args.size / 2) - dom.getHeight(args.elements.editButton)
        )
    })

    return temp
}

function createExample(clickedRect){
    document.querySelectorAll("div").forEach((elem) => {
        elem.remove()
    })

    let elem = dom.createElementAtPos(
        "div", 
        c.divide("width", 2) - c.divide("min", 2), 
        c.divide("height", 2) - c.divide("min", 2), 
        (element) => {
            element.innerHTML = "<button id='close_example'>❌</button><input id='example' value='Example Text' />"
            rects.forEach((rect) => {
                if(rect.id != clickedRect.id){
                    element.innerHTML += `<p style='color: ${rect.fill}; font-size: 10vmin;'> Example Text </p>`
                }
            })
            element.style.backgroundColor = clickedRect.fill
            element.style.width = c.divide("min") + "px"
            element.style.height = c.divide("min") + "px"
            element.style.overflowY = "auto"
            element.style.overflowX = "hidden"
        }
    )

    listen('#close_example', "click", (e) => {
        document.querySelectorAll("div").forEach((elem) => {
            elem.remove()
        })
    })
}