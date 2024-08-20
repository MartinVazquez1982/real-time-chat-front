import '../../assets/styles/components/buttonForm.css'

interface props {
    text: string
    disable?: boolean
}

const ButtonForm: React.FC<props> = ({text, disable = false}) => {
    return (
        <button type='submit' disabled={disable}>{text}</button>
    )
}

export default ButtonForm