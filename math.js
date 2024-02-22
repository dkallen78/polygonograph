class Point {
	//----------------------------------------------------//
	//A data structure to make managing and representing	//
	//	Cartesian points easier														//
	//----------------------------------------------------//
	//x(float): x coordinate of the point									//
	//y(float): y coordinate of the point									//
	//----------------------------------------------------//

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

	static center(p1, p2) {
		//----------------------------------------------------//
		//Finds the center point between p1 and p2						//
		//----------------------------------------------------//
		//p1, p2(Point): points of which the center is to     //
    //  be found                                          //
		//----------------------------------------------------//
		//return(Point): the point at the midpoint between the//
		//	original two points																//
		//----------------------------------------------------//

		const midX = (p1.x + p2.x) / 2;
		const midY = (p1.y + p2.y) / 2;
		const newCenter = new Point(midX, midY);
		return newCenter;
	}

  static distance(p1, p2) {
    /*----------------------------------------------------//
    //Finds the  distance between two points on a         //
    //  cartesian plane using the Pythagorean theorem     //
    //----------------------------------------------------//
    //p1, p2(Point): points between which the distance    //
    //  is to be found                                    //
    //----------------------------------------------------//
    //return(float): distance between two points          //
    //----------------------------------------------------*/
  
    return (Math.sqrt(((p1.x - p2.x) ** 2) + ((p1.y - p2.y) ** 2))).toFixed(4);
  }

	static vector(p1, p2) {
		//----------------------------------------------------//
		//Finds the vector from p1 to p2											//
		//----------------------------------------------------//
		//p1, p2(Point): points on the vector to be found			//
		//----------------------------------------------------//
		//return(Point): the vector from p1 to p2							//
		//----------------------------------------------------//

		const vecX = (p1.x - p2.x);
		const vecY = (p1.y - p2.y);
		const newVector = new Point(vecX, vecY);
		return newVector;
	}
}
      
function toRad(deg) {
  //----------------------------------------------------//
  //Converts an angle in degrees to an angle in radians	//
  //----------------------------------------------------//
  //deg(float): angle to be converted to radians				//
  //----------------------------------------------------//
  //return(float): converted degrees in radians					//
  //----------------------------------------------------//

  return deg * (Math.PI / 180);
}

function toDeg(rad) {
  //----------------------------------------------------//
  //Converts an angle in radians to an angle in degrees	//
  //----------------------------------------------------//
  //deg(float): angle to be converted to degrees				//
  //----------------------------------------------------//
  //return(float): converted radians in degrees					//
  //----------------------------------------------------//

  return rad * (180 / Math.PI);
}