export function createElementAtPos(tag, x, y, createFuncs){
    let element = document.createElement(tag)
    element.style.position = "fixed"
    element.style.top = y + "px"
    element.style.left = x + "px"

    document.querySelector("body").append(element)

    createFuncs(element)

    return element
}

export function moveElementToPos(element, x, y){
    element.style.top = y + "px"
    element.style.left = x + "px"
}

export function getWidth(element){
    let domRect = element.getBoundingClientRect()
    return domRect.width
}

export function getHeight(element){
    let domRect = element.getBoundingClientRect()
    return domRect.height
}