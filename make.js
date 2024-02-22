function clear(...elements) {
  //----------------------------------------------------//
  //Clears the innerHTML of any number of elements      //
  //----------------------------------------------------//
  //elements(DOM element): elements to be cleared       //
  //----------------------------------------------------//

  elements.forEach(x => x.innerHTML = "");
}

function get(id) {
  return document.getElementById(id);
}

function make(type, id, classes) {
  //----------------------------------------------------//
  //Returns an DOM element                              //
  //----------------------------------------------------//
  //type(string): type of DOM element to create         //
  //id(string): id of the element                       //
  //classes(string): classes to add to the element      //
  //----------------------------------------------------//
  //return(element): DOM element                        //
  //----------------------------------------------------//

  let element = document.createElement(type);
  if (typeof id === "string") {element.id = id}
  if (typeof classes === "string") {
    element.classList.add(classes);
  } else if (typeof classes === "object") {
    classes.forEach(x => element.classList.add(x));
  }
  return element;
}

make.svg = function(id, classes, viewBox) {
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  if (typeof id === "string") {svg.id = id}
  if (typeof classes === "string") {
    svg.classList.add(classes);
  } else if (typeof classes === "object") {
    classes.forEach(x => svg.classList.add(x));
  }
  if (typeof viewBox === "string") {
    svg.setAttribute("viewBox", viewBox);
  }
  return svg;
}

make.animate = function() {
  let animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
  return animate;
}

make.g = function() {
  let g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  return g;
}

make.line = function(x1, y1, x2, y2, id, ...classes) {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  if (typeof id === "string") {this.rect.id = id}
  classes.forEach(x => line.classList.add(x));
  return line;
}

make.path = function(id, classes) {
  let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  if (typeof id === "string") {path.id = id}
  if (typeof classes === "string") {
    path.classList.add(classes);
  } else if (typeof classes === "object") {
    classes.forEach(x => path.classList.add(x));
  }
  return path;
}

make.rect = function(x, y, w, h, id, ...classes) {

  let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", x);
  rect.setAttribute("y", y);
  rect.setAttribute("width", w);
  rect.setAttribute("height", h);
  if (typeof id === "string") {rect.id = id}
  classes.forEach(x => rect.classList.add(x));
  return rect;
}