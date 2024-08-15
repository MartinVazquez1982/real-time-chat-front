interface props {
  show: boolean
  message: string
}

function ErrorMsg ({
  show,
  message
}: props) {
  return(
    <div style={{ display: show ? 'block' : 'none'}}>
      <p style={{ color: '#f00' }}>{message}</p>
    </div>
  )
}

export default ErrorMsg