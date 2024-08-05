import { useEffect, useState } from "react";
import './Filter.css'
/* eslint-disable react/prop-types */

const Filter = ({setFilters }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 480);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;

        setFilters((prev) => {
            if (name === 'size') {
                // Manejo de los filtros de tamaño
                const sizes = checked 
                    ? [...prev.size, value] 
                    : prev.size.filter((item) => item !== value);
                return { ...prev, size: sizes };
            } else {
                // Manejo de los filtros de categoría
                const categories = checked 
                    ? [...prev.category, value] 
                    : prev.category.filter((item) => item !== value);
                return { ...prev, category: categories };
            }
        });
    };

    const filterContent = (
        <div className="filter-content">
            <div className="filter-section">
                <h3>Categorías</h3>
                <div className="filter-item">
                    <input
                        type="checkbox"
                        name="category"
                        value="calzas largas"
                        onChange={handleCheckboxChange}
                    />
                    <label>Calzas Largas</label>
                </div>
                <div className="filter-item">
                    <input
                        type="checkbox"
                        name="category"
                        value="bikers"
                        onChange={handleCheckboxChange}
                    />
                    <label>Bikers</label>
                </div>
                <div className="filter-item">
                    <input
                        type="checkbox"
                        name="category"
                        value="calzas cortas"
                        onChange={handleCheckboxChange}
                    />
                    <label>Calzas cortas</label>
                </div>
                <div className="filter-item">
                    <input
                        type="checkbox"
                        name="category"
                        value="tops"
                        onChange={handleCheckboxChange}
                    />
                    <label>Tops</label>
                </div>
            </div>

            <div className="filter-section">
                <h3>Filtros</h3>

                <div className="filter-subsection">
                    <label>Talle</label>
                    <div className="filter-item">
                        <input
                            type="checkbox"
                            name="size"
                            value="S"
                            onChange={handleCheckboxChange}
                        />
                        <label>S</label>
                    </div>
                    <div className="filter-item">
                        <input
                            type="checkbox"
                            name="size"
                            value="M"
                            onChange={handleCheckboxChange}
                        />
                        <label>M</label>
                    </div>
                    <div className="filter-item">
                        <input
                            type="checkbox"
                            name="size"
                            value="L"
                            onChange={handleCheckboxChange}
                        />
                        <label>L</label>
                    </div>
                    <div className="filter-item">
                        <input
                            type="checkbox"
                            name="size"
                            value="XL"
                            onChange={handleCheckboxChange}
                        />
                        <label>XL</label>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {isMobile ? (
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                            >
                                Filtros
                            </button>
                        </h2>
                        <div
                            id="collapseOne"
                            className="accordion-collapse collapse show"
                            data-bs-parent="#accordionExample"
                        >
                            <div className="accordion-body">
                                {filterContent}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>{filterContent}</div>
            )}
        </>
    );
};

export default Filter;
