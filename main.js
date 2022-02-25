import * as c from "./canvas.js"
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
        fill: c.randomColor(),
        centered: true,
        lineWidth: 2,
        rotation: 0,
        currentRotation: 0
    }
    bind(temp, 'size', () => c.divide('min',  15))
    bind(temp, 'rotation', () => temp.currentRotation++)

    rects.push(temp)
})

listen("canvas", "click", (e) => {
    let point = {
        x: e.clientX,
        y: e.clientY
    }

    rects.forEach((rect, index) => {
        if(c.isPointInsideRect(rect, point)){
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
    forAll(
        c.getLinesToConnectAll(
            rects, 
            rects, 
            {
                stroke: "blue",
                lineWidth: 2
            }
        ),
        c.drawLine
    )
    forAll(rects, c.drawRect)
}