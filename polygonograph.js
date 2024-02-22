function makePolyPath(sides, startAngle) {

  const angleChange = 360 / sides;
  let shapePath = "";
  let points = [];

  for (let i = 0; i < sides; i++) {

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

function drawPolygon(sides, lineStatus) {

  let polyPath = makePolyPath(sides, initialAngle);

  const svg = get("svg");

  let path = make.path();
    path.setAttribute("d", polyPath.path);
    path.setAttribute("fill-opacity", 0);
    path.setAttribute("stroke", "black");
  svg.appendChild(path);

  switch(lineStatus) {
    case "1":
      connectVertices(polyPath.points, svg);
      break;
    case "2":
      connectToMidpoints(polyPath.points, svg);
      break;
  }

}

let sides = 3;
let initialAngle = 270;
const svgSize = 100;
const center = svgSize / 2;
const radius = (svgSize / 2) - 1;
let lineStatus = 0;

drawPolygon(sides, 0);

const slider = get("poly-slider")
slider.addEventListener("input", (event) => {
  sides = event.target.value;
  clear(get("svg"));
  drawPolygon(sides, lineStatus);
})

const lineButtons = get("line-buttons");
lineButtons.addEventListener("change", (event) => {
  lineStatus = event.target.value;
  clear(get("svg"));
  drawPolygon(sides, lineStatus);
})

/*const animationInterval = setInterval(() => {

  initialAngle = (initialAngle + 1) % 360;

  polyPath = makePolyPath(sides, initialAngle);
  path.setAttribute("d", polyPath.path);
  
}, 10);*/