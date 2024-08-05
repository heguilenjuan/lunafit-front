import { Link, useLocation } from 'react-router-dom';

const NavAdmin = () => {
    const location = useLocation();

  return (
    <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className={`breadcrumb-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
            <Link to="/dashboard" >
              Panel de control
            </Link></li>
          <li className={`breadcrumb-item ${location.pathname === '/create-product' ? 'active' : ''}`}>
            <Link to="/create-product" >
              Crear Producto
            </Link>
          </li>

        </ol>
      </nav>
  )
}

export default NavAdmin;