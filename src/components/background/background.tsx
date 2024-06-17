import LineGreen from "./greenLine"
import SquareBackgroundItem from "./squareBackgroundItem"
import '../../assets/styles/components/background.css'
import { useState, useEffect } from 'react'

function Background () {
  const [amountSquare, setAmountSquare] = useState<Array<number>>([])

  useEffect(() => {

    function calculateScreenArea() {
      const areaWindow = window.innerWidth * window.innerHeight
      const areaSquare = 12100
      const componentes = Array.from({ length: Math.floor(areaWindow/areaSquare) }, (_, index) => index + 1);
      setAmountSquare(componentes)
    }

    calculateScreenArea();

    window.addEventListener('resize', calculateScreenArea);

    return () => {
      window.removeEventListener('resize', calculateScreenArea);
    }
  }, [])

  return (
    <>
      <LineGreen></LineGreen>
      <div className="squares">
        { amountSquare.map(() => (
          <SquareBackgroundItem></SquareBackgroundItem>
        ))}
      </div>
      </>
  )
}

export default Background