import '../../assets/styles/components/input.css'
import { ChangeEvent, useState } from 'react'


interface props {
  label: string
  type: string
  name: string
  value: string
  hangle: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<props> = ({label, type, name, value, hangle}) => {
  
  const [labelUp, setLabelUp] = useState(false)

  const hangleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('pase')
    const { value } = e.target;
    if (value.length > 0) {
      setLabelUp(true)
    } else {
      setLabelUp(false)
    }
    hangle(e)
  }
  
  return (
    <div className='container-input'>
      <input type={type} name={name} onChange={hangleChange} value={value}/>
      <label className={labelUp ? 'value-on' : 'value-off'}>{label}</label>
    </div>
  )
}

export default Input