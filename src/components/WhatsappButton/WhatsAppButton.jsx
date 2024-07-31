import './WhatsAppButton.css';

const WhatsAppButton = () => {
    const handleWhatsAppClick = () => {
        const phoneNumber = '+542914429530'; // Reemplaza con tu número de teléfono
        const message = 'Hola, que tal!! vengo desde la pagina, me gustaría más información.';
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="whatsAppButton" onClick={handleWhatsAppClick}>
            <img src="/icons/whatsap-bottom.svg" alt="whatsap-icon" width={50} height={50}/>
        </div>
    );
};

export default WhatsAppButton;
