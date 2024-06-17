import '../../assets/styles/components/input.css'

interface props {
    label: string
}

const Input: React.FC<props> = ({label}) => {
    return (
        <div className='container-input'>
            <input type="text" />
            <label htmlFor="">{label}</label>
        </div>
    )
}

export default Input