import './NotFound.css'; // Asegúrate de tener este archivo de estilos

const NotFound = () => {
    return (
        <div className="not-found-container">
            <img 
                src="/logo.webp" 

                alt="Proximamente disponible" 
                className="not-found-image"
            />
            <h1 className="not-found-text">Próximamente Disponible</h1>
        </div>
    );
};

export default NotFound;
