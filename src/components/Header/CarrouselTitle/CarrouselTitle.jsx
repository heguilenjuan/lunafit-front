import { useEffect, useState } from 'react';


const CarrouselTitle = () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const items = ['ENCONTRÁ TU ESTILO DEPORTIVO PERFECTO', 'DESCUBRÍ LA COMODIDAD EN CADA MOMENTO', 'EXPLORÁ NUESTRAS NUEVAS COLECCIONES', 'DESCUBRÍ LA ENERGIA DE NUESTRO PRODUCTOS', 'SUMERGITE EN LA MODA DEPORTIVA'];

    const [index, setIndex] = useState(0);
    const [arrElement, setArrElement] = useState(items[0]);

    useEffect(() => {
        let timer = null;
        const next = () => {
            const nextIndex = (index + 1) % items.length;
            setIndex(nextIndex);
            setArrElement(items[nextIndex]);
        };
        const handleAutoSlide = () => {
            timer = setTimeout(() => {
                next();
            }, 3000);
        };

        handleAutoSlide();
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [index, items]);

    const firstWord = arrElement.split(' ')[0];
    const restOfSentence = arrElement.split(' ').slice(1).join(' ');


    return (
        <>
            <p>
                <mark>{firstWord}</mark> {restOfSentence}
            </p>
        </>
    )
}



export default CarrouselTitle