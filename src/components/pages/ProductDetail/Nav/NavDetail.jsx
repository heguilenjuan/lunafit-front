import { Link, useLocation } from 'react-router-dom';

const NavDetail = () => {
    const location = useLocation();

  return (
    <nav aria-label="breadcrumb ">
        <ol className="breadcrumb ">
          <li className={`breadcrumb-item ${location.pathname === '/' ? 'active ' : '' }`}>
            <Link to="/Inicio" >
              Inicio
            </Link></li>
          <li className={`breadcrumb-item ${location.pathname === '/products' ? 'active' : ''}`}>
            <Link to="/products" >
                Productos
            </Link>
          </li>

        </ol>
      </nav>
  )
}

export default NavDetail;