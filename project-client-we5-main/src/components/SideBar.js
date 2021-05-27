import { navigate } from '@reach/router'
import '../styles/sidebar.css'

const SideBar = () => {
  const handleNavigate = path => () => navigate(path)
  return (
    <div id='side-bar'>
      <div className='username'>John Doe</div>
      <div className='sidebar-options'>
        <div onClick={handleNavigate('/')}>Feed</div>
        <div onClick={handleNavigate('/sales')}>Sales</div>
        <div onClick={handleNavigate('/service')}>Service</div>
        <div onClick={handleNavigate('/events')}>Events</div>
        <div onClick={handleNavigate('/lost-and-found')}>Lost & Found</div>
        <div onClick={handleNavigate('/trainings')}>Trainings</div>
        <div onClick={handleNavigate('/tutorials')}>Tutorials</div>
        <div onClick={handleNavigate('/stores')}>Stores</div>
        <hr />
        <div onClick={handleNavigate('/my-posts')}>My Posts</div>
        <div onClick={handleNavigate('/saved')}>Saved</div>
        <hr />
        <div onClick={handleNavigate('/users')}>Users</div>
      </div>
    </div>
  )
}

export default SideBar
