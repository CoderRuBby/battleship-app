export interface shipInterface {
  props: {
    name: string;
    length: number;
    hit: number;
    sunk: boolean;
    shipStartPoint: number | null;
    shipEndPoint: number | null;
    isPlaced: boolean;
    placedLocations: number[];
    hitLocations: number[];
  };
  isHit: (location: number) => void;
  isSunk: () => void;
  addShipStart: (squareNumber: number) => void;
  addShipEndPoint: (squareNumber: number) => void;
  getHitLocations: () => void;
  reset: () => void;
}

export default function ship(name: string, length: number): shipInterface {
  const props: shipInterface['props'] = {
    name: name,
    length: length,
    hit: 0,
    sunk: false,
    shipStartPoint: null,
    shipEndPoint: null,
    isPlaced: false,
    placedLocations: [] as number[],
    hitLocations: [] as number[],
  };
  const isHit = (location: number) => {
    props.hitLocations.push(location);
    props.hit++;
    isSunk();
  };
  const isSunk = () => {
    if (props.hit === props.length) {
      props.sunk = true;
    }
  };
  const addShipStart = (squareNumber: number) => {
    props.shipStartPoint = squareNumber;
  };
  const addShipEndPoint = (squareNumber: number) => {
    props.shipEndPoint = squareNumber;
  };
  const getHitLocations = (): number[] => {
    return props.hitLocations;
  };
  const reset = () => {
    props.hit = 0;
    props.sunk = false;
    props.shipStartPoint = 0;
    props.shipEndPoint = 0;
    props.isPlaced = false;
    props.placedLocations = [];
    props.hitLocations = [];
  };
  return {
    props,
    isHit,
    isSunk,
    addShipStart,
    addShipEndPoint,
    getHitLocations,
    reset,
  };
}
