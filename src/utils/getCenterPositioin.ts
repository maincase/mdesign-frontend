const getCenterPosition = (width: number, height: number, left: number, top: number) => {
  var center_x = left + width / 2
  var center_y = top + height / 2

  return {
    x: center_x,
    y: center_y,
  }
}

export default getCenterPosition
