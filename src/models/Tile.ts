export default class Tile {
  value: number | undefined
  constructor(public readonly index : number){}
  setValue(val: number){
    this.value = val
    return this
  }

  isEmpty() {
    return !this.value
  }
} 