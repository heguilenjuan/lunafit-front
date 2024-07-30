import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
        <nav>
          <ul>
            <li>
              <Link to={'/create-product'}>
                Crear Producto
              </Link>
            </li>
          </ul>
        </nav>
    </div>
  )
}

export default Dashboard;