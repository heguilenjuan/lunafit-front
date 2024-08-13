import './ChangePolicy.scss'; // Asegúrate de crear este archivo CSS para los estilos

const ChangePolicy = () => {
    return (
        <div className="change-policy-container">
            <h2>Políticas de Cambio</h2>
            <p>
                La compra de nuestros productos implica que has leído y aceptado los Términos y Condiciones de Uso descritos a continuación:
            </p>
            <ul>
                <li>
                    Los reclamos deben realizarse dentro de los <strong>3 días hábiles</strong> posteriores a la recepción del paquete, <strong>SIN EXCEPCIONES</strong>.
                </li>
                <li>
                    Solo se realizan cambios por <strong>falla de confección</strong> del mismo artículo, salvo excepciones como falta de stock del mismo. <strong>NO</strong> se realizan cambios por tallas.
                </li>
                <li>
                    Todos los cambios se realizan en nuestras oficinas ubicadas en San Martín, Buenos Aires.
                </li>
                <li>
                    En caso de no poder acercarse por cuestiones de lejanía y el producto se recibió con falla, nos hacemos cargo de los envíos de sucursal a sucursal del Correo Argentino o SIMPACK.
                </li>
                <li>
                    Si falta algún producto, se enviará en el próximo pedido o podrá ser retirado en nuestras oficinas en San Martín. Si el comprador exige el envío, se hará a través del Correo Argentino o, en su defecto, se realizará la devolución del faltante.
                </li>
                <li>
                    La prenda requerida a cambio deberá devolverse en las siguientes condiciones:
                    <ul>
                        <li>Sin uso</li>
                        <li>Sin alteraciones a su estado original (rota, manchada, con cabellos, enganchada, etc.)</li>
                        <li>Con su envoltorio completo y etiquetas</li>
                    </ul>
                </li>
                <li>
                    El cliente es responsable de los datos personales ingresados al realizar la compra, como mail, número telefónico, dirección y nombre. Los envíos y la comunicación se realizan en base a estos datos. Ante cualquier error, por favor modifícalo correctamente (no nos hacemos responsables).
                </li>
            </ul>
            <p>
                Para cualquier inconveniente o consulta, no dudes en ponerte en contacto con nosotros. ¡Estamos aquí para ayudarte! ♥ Gracias por elegirnos ♥
            </p>
        </div>
    );
};

export default ChangePolicy;
