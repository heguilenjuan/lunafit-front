/* eslint-disable react/prop-types */
// Filter.js
import { useEffect, useState } from "react";
import './Filter.css';

const Filter = ({ filters, setFilters }) => {
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
                const sizes = checked 
                    ? [...prev.size, value] 
                    : prev.size.filter((item) => item !== value);
                return { ...prev, size: sizes };
            } else {
                const categories = checked 
                    ? [...prev.category, value] 
                    : prev.category.filter((item) => item !== value);
                return { ...prev, category: categories };
            }
        });
    };

    console.log(filters)

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
                        checked={filters.category.includes("calzas largas")}
                    />
                    <label>Calzas Largas</label>
                </div>
                <div className="filter-item">
                    <input
                        type="checkbox"
                        name="category"
                        value="bikers"
                        onChange={handleCheckboxChange}
                        checked={filters.category.includes("bikers")}
                    />
                    <label>Bikers</label>
                </div>
                <div className="filter-item">
                    <input
                        type="checkbox"
                        name="category"
                        value="calzas cortas"
                        onChange={handleCheckboxChange}
                        checked={filters.category.includes("calzas cortas")}
                    />
                    <label>Calzas Cortas</label>
                </div>
                <div className="filter-item">
                    <input
                        type="checkbox"
                        name="category"
                        value="tops"
                        onChange={handleCheckboxChange}
                        checked={filters.category.includes("tops")}
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
                            value="1/2"
                            onChange={handleCheckboxChange}
                            checked={filters.size.includes("1/2")}
                        />
                        <label>1/2</label>
                    </div>
                    <div className="filter-item">
                        <input
                            type="checkbox"
                            name="size"
                            value="3/4"
                            onChange={handleCheckboxChange}
                            checked={filters.size.includes("3/4")}
                        />
                        <label>3/4</label>
                    </div>
                    <div className="filter-item">
                        <input
                            type="checkbox"
                            name="size"
                            value="S"
                            onChange={handleCheckboxChange}
                            checked={filters.size.includes("S")}
                        />
                        <label>S</label>
                    </div>
                    <div className="filter-item">
                        <input
                            type="checkbox"
                            name="size"
                            value="M"
                            onChange={handleCheckboxChange}
                            checked={filters.size.includes("M")}
                        />
                        <label>M</label>
                    </div>
                    <div className="filter-item">
                        <input
                            type="checkbox"
                            name="size"
                            value="L"
                            onChange={handleCheckboxChange}
                            checked={filters.size.includes("L")}
                        />
                        <label>L</label>
                    </div>
                    <div className="filter-item">
                        <input
                            type="checkbox"
                            name="size"
                            value="XL"
                            onChange={handleCheckboxChange}
                            checked={filters.size.includes("XL")}
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
