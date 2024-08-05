import './Spinner.css';

import Logo from '../../assets/images/logo.webp';


const Spinner = () => {
    return (
        <div className="spinner-container">
            <div className="spinner">
                <img className="logoSpin" src={Logo} alt="Logo" />
                <p>Cargando...</p>
            </div>
        </div>
    );
};

export default Spinner;
