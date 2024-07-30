import Navbar from './Navbar'

const Layout = ({children}) => {
  return (
<div>
<Navbar/>
    <div className='min-h-screen'>
  {children}
    </div>
    <div>
    footer</div>
</div>

  )
}

export default Layout
