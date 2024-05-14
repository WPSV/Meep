type TButtonProps = {
  children: string,
  onClick: () => void,
  disabled?: boolean
}

const Button = ({ children, onClick, disabled }: TButtonProps) => {
  return (
    <button disabled={disabled} className="button" onClick={onClick}>{children}</button>
  )
}

export default Button;