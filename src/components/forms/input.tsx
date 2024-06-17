import '../../assets/styles/components/input.css'

interface props {
    label: string
    type: string
}

const Input: React.FC<props> = ({label, type}) => {
    return (
        <div className='container-input'>
            <input type={type} />
            <label htmlFor="">{label}</label>
        </div>
    )
}

export default Input