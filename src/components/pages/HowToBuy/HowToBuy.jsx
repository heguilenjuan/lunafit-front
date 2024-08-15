import './HowToBuy.scss';

const HowToBuy = () => {
    return (
        <div className='how-to-buy'>
            <h1>Cómo Comprar en LunaFit</h1>
            
            <h2>1. Crear una Cuenta</h2>
            <p>Para comenzar a comprar, primero debes crear una cuenta en nuestro sitio. Simplemente regístrate con tu dirección de correo electrónico. Asegúrate de utilizar un correo válido, ya que necesitarás confirmar tu cuenta para completar el proceso de compra.</p>

            <h2>2. Confirmar tu Correo Electrónico</h2>
            <p>Después de registrarte, recibirás un correo electrónico para confirmar tu cuenta. Este paso es crucial para garantizar que la comunicación sea fluida y segura. Verifica tu bandeja de entrada y, si no ves el correo, revisa también la carpeta de spam.</p>

            <h2>3. Verifica la Disponibilidad</h2>
            <p>Actualmente, solo realizamos envíos en Bahía Blanca y la zona. Si te encuentras fuera de esta área, lamentablemente no podrás completar tu compra en este momento.</p>

            <h2>4. Elegir Productos</h2>
            <p>Navega por nuestro catálogo y elige los productos que deseas comprar. Ten en cuenta que no puedes comprar más de 2 prendas del mismo producto. Si necesitas adquirir una cantidad mayor, por favor contáctanos a través de WhatsApp para consultar sobre la disponibilidad.</p>

            <h2>5. Realiza tu Pedido</h2>
            <p>Una vez hayas seleccionado tus productos, realiza el pedido. La orden quedará en estado <strong>pendiente</strong> mientras procesamos la información.</p>

            <h2>6. Abonar el Total</h2>
            <p>Recibirás un correo electrónico con el total a abonar. Tienes un plazo de 24 horas para realizar la transferencia bancaria. Envía el comprobante de la transferencia a nuestro WhatsApp junto con el número de orden que se te proporcionó. Si no recibimos el comprobante en ese plazo, tu pedido será cancelado automáticamente.</p>

            <h2>7. Estado de tu Orden</h2>
            <ul>
                <li><strong>Pendiente</strong>: Tu orden está en espera de confirmación de pago.</li>
                <li><strong>Shipped</strong>: Una vez que recibamos el comprobante de pago, tu pedido pasará al estado de <strong>Shipped</strong>. Esto significa que estamos preparando tu pedido.</li>
            </ul>

            <h2>8. Coordinación de Envío o Retiro</h2>
            <p>Una vez que tu pedido esté en estado <strong>Shipped</strong>, recibirás instrucciones adicionales a través de WhatsApp:</p>
            <ul>
                <li><strong>Retiro en el Local</strong>: Coordinaremos contigo la fecha y hora de retiro.</li>
                <li><strong>Envío a Domicilio</strong>: Te indicaremos los pasos para coordinar el envío.</li>
            </ul>

            <div className='contact-info'>
                <h3>Contacto</h3>
                <p>Para cualquier consulta o ayuda adicional, no dudes en contactarnos a través de WhatsApp.</p>
            </div>
        </div>
    );
}

export default HowToBuy;
