/* eslint-disable react/prop-types */
function Button(props) {
  return (
    <div>
        <button onClick={props.onClick} className="button" style={{backgroundColor: props.color ,width: props.width, padding: props.padding}}>{props.title}</button>
    </div>
  )
}

export default Button