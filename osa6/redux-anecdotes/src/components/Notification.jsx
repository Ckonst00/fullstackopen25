import { useSelector } from 'react-redux'



const Notification = () => {

  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const newNotification = 
    <div style={style}>
      {notification}
    </div>

  const defaultView = <div></div>
  return (
    <div>
      {(notification === '') ? defaultView : newNotification}
    </div>
  )
}

export default Notification