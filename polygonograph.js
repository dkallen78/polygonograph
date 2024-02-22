function makePolyPath(sides, startAngle, turns) {
  //----------------------------------------------------//
  //Makes the path for the polygon                      //
  //----------------------------------------------------//
  //sides(integer): number of sides or edges            //
  //startAngle(integer): the initial angle from which   //
  //  to draw the edges                                 //
  //turns(integer): how many vertices to skip between   //
  //  the edges                                         //
  //----------------------------------------------------//
  //return(object):                                     //
  //  .points(array[Point]): an array of the (x,y) pairs//
  //    of the polygon vertices                         //
  //  .path(string): the strink that defines the path   //
  //    of the polygon edges                            //
  //----------------------------------------------------//

  const angleChange = 360 / sides;
  let shapePath = "";
  let points = [];

  for (let i = 0; i < sides * turns; i += turns) {

    const x = center + (Math.cos(toRad(startAngle + (angleChange * i))) * radius);
    const y = center + (Math.sin(toRad(startAngle + (angleChange * i))) * radius);
  
    const point = new Point(x, y);
    points.push(point);
  
    if (i === 0) {
      shapePath += `M ${x} ${y} `;
    } else {
      shapePath += `L ${x} ${y} `;
    }
  }

  shapePath += "Z";

  return {points: points, path: shapePath};
}

function connectVertices(points, svg) {
  //----------------------------------------------------//
  //Connects all of the vertices with lines             //
  //----------------------------------------------------//
  //points(array[Point]): The coordinates of the        //
  //  vertices to be connected                          //
  //svg(element): the element in which to draw the lines//
  //----------------------------------------------------//

  for (let i = 0; i < points.length - 2; i++) {

    const start = i + 2;
    const limit = i < 2 ? (points.length - 3) : (points.length - (i + 2));

    for (let j = start; j < (start + limit); j++) {
      let line = make.line(points[i].x, points[i].y, points[j].x, points[j].y);
      line.setAttribute("stroke", "black");
      svg.appendChild(line);
    }
  }
}

function connectToMidpoints(points, svg) {
  //----------------------------------------------------//
  //Connects the vertices with the midpoints betweeen   //
  //  them                                              //
  //----------------------------------------------------//
  //points(array[Point]): The coordinates of the        //
  //  vertices to be connected                          //
  //svg(element): the element in which to draw the lines//
  //----------------------------------------------------//

  let midpoints = [];
  //
  //Finds the midpoints
  for (let i = 0; i < points.length; i++) {
    midpoints.push(Point.center(points[i], points[(i + 1) % points.length]));
  }
  //
  //Iterates through the vertex points
  for (let i = 0; i < points.length; i++) {
    let start = i + 1;
    let end = start + (points.length - 2);
    //
    //Iterates over the midpoints
    for (let j = start; j < end; j++) {
      let line = make.line(points[i].x, points[i].y, midpoints[j % points.length].x, midpoints[j % points.length].y);
      line.setAttribute("stroke", "black");
      svg.appendChild(line);
    }
  }
}

function drawPolygon(sides, turns, lineStatus) {
  //----------------------------------------------------//
  //Draws the polygon on the screen and any extra lines //
  //  as indicated                                      //
  //----------------------------------------------------//
  //sides(integer): number of edges to be drawn         //
  //turns(integer): how many verticies to skip while    //
  //  plotting the path                                 //
  //lineStatus(integer): determines if any extra lines  //
  //  should be drawn                                   //
  //    1: lines connecting vertices to each other      //
  //    2: lines connecting vertices to edge midpoints  //
  //----------------------------------------------------//

  let polyPath = makePolyPath(sides, initialAngle, turns);

  const svg = get("svg");

  let path = make.path();
    path.setAttribute("d", polyPath.path);
    path.setAttribute("fill-opacity", 0);
    path.setAttribute("stroke", "black");
  svg.appendChild(path);

  updateSchlafli(sides, turns);

  switch(lineStatus) {
    case "1":
      connectVertices(polyPath.points, svg);
      break;
    case "2":
      connectToMidpoints(polyPath.points, svg);
      break;
  }

}

function updateTurnButtons(sides) {
  //----------------------------------------------------//
  //Updates the radio buttons that determine the number //
  //  of turns in the polygon                           //
  //----------------------------------------------------//
  //sides(integer): number of edges in the polygon      //
  //----------------------------------------------------//

  let turnDiv = get("turn-buttons-div");
  clear(turnDiv);

  let label = make.label("turns-1", "1");
  turnDiv.appendChild(label);
  let radio = make.radio("turns", "1", "turns-1");
  turnDiv.appendChild(radio);

  /*if (sides < 5) {
    return
  };*/

  const factors = findFactors(sides);

  for (let i = 2; i < sides / 2; i++) {
    label = make.label(`turns-${i}`, `${i}`);
    turnDiv.appendChild(label);
    radio = make.radio("turns", i, `turns-${i}`);
    turnDiv.appendChild(radio);
  }

  turnDiv.addEventListener("change", turnButtonListener);
  
  const currentTurns = get(`turns-${turns}`);
  console.log(turns);

  if (currentTurns === null) {
    turns = parseInt(turnDiv.lastChild.value, 10);
    turnDiv.lastChild.checked = true;
  } else {
    currentTurns.checked = true;
  }
}

function turnButtonListener(event) {
  turns = parseInt(event.target.value, 10);
  clear(get("svg"));
  drawPolygon(sides, turns, lineStatus);
}

function updateSchlafli(sides, turns) {
  let polygonId = get("polygon-id");
  polygonId.innerHTML = `{${sides}/${turns}}`;
}

let sides = 3;
let turns = 1;
let initialAngle = 270;
const svgSize = 100;
const center = svgSize / 2;
const radius = (svgSize / 2) - 1;
let lineStatus = 0;

updateTurnButtons(sides);
drawPolygon(sides, turns, lineStatus);

const slider = get("poly-slider")
slider.addEventListener("input", (event) => {
  sides = event.target.value;
  clear(get("svg"));
  updateTurnButtons(sides);
  drawPolygon(sides, turns, lineStatus);
});

const lineButtons = get("line-buttons");
lineButtons.addEventListener("change", (event) => {
  lineStatus = event.target.value;
  clear(get("svg"));
  drawPolygon(sides, turns, lineStatus);
});

//const turnButtons = get("turn-buttons");

/*const animationInterval = setInterval(() => {

  initialAngle = (initialAngle + 1) % 360;

  polyPath = makePolyPath(sides, initialAngle);
  path.setAttribute("d", polyPath.path);
  
}, 10);*/