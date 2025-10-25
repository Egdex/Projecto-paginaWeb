import { useEffect, useState } from "react";
import { getProductos } from "../services/productServices";

export function Productos() {

    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProductos();
            setProductos(data);
        };
        fetchData();

    }, []);
    return (
            <div className="container">
                <h3>Lista de Productos</h3>
                <div className="row">
                    {productos.map(prod => (
                            <div className="col-md-4 my-2" key={prod.id}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{prod.nombre}</h5>
                                        <p className="card-text">{prod.descripcion}</p>
                                        <p className="card-text">{prod.precio}</p>
                                    </div> 
                                </div>
                            </div>
                        ))}
                </div>
            </div>
    );
}




