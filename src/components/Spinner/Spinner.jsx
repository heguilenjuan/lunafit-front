import './Spinner.css';

const Spinner = () => {
    return (
        <div className="spinner-container">
            <div className="spinner">
                <img className="logoSpin" src="/logo.webp" alt="Logo" />
                <p>Cargando...</p>
            </div>
        </div>
    );
};

export default Spinner;
