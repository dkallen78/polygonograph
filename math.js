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

function findFactors(n) {
  //----------------------------------------------------//
  //Finds all the factors of a number except for itself //
  //  and 1                                             //
  //----------------------------------------------------//
  //n(integer): the number to find the factors of       //
  //----------------------------------------------------//
  //return(array[integer]): an array of factors         //
  //----------------------------------------------------//

  let factors = [];

  for (let i = 2; i <= (n / 2); i++) {
    
    if ((n % i) === 0) factors.push(i);
  }

  return factors;
}

function findGreatestFactor(n1, n2) {

  if (n1 === 1 || n2 === 1) return 1;

  let commonFactors = [];
  const factors1 = findFactors(n1);
  const factors2 = findFactors(n2);

  if (factors1.includes(n2)) return n2;
  if (factors2.includes(n1)) return n1;

  factors1.forEach((n) => {
    if (factors2.includes(n)) commonFactors.push(n);
  });
  
  if (commonFactors.length === 0) return 1;
  return commonFactors[commonFactors.length - 1];
}

function areCoprime(n1, n2) {

  console.log(n1, n2);

  if (n1 === 1 || n2 === 1) return true;
  console.log("no 1s")

  const factors1 = findFactors(n1);
  const factors2 = findFactors(n2);

  console.log(factors1, factors2)

  if (factors1.includes(n2)) return false;
  if (factors2.includes(n1)) return false;

  console.log("no samesies")

  for (let i = 0; i < factors1.length; i++) {
    if (factors2.includes(factors1[i])) return false;
  }

  return true;
}

