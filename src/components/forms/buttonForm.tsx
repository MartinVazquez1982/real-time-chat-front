import '../../assets/styles/components/buttonForm.css'

interface props {
    text: string
}

const ButtonForm: React.FC<props> = ({text}) => {
    return (
        <button type='submit'>{text}</button>
    )
}

export default ButtonForm