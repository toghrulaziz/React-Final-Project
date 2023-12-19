import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";



function Order() {

    let orders = useSelector((state) => state.goods.ordersArray);
    let { orderName } = useParams();

    const foundOrder = orders.find(item => item.name === orderName)

    return (
        <div className="App">
            <div className="order">
                {foundOrder ? (
                    <div>
                        <h1>ORDERER INFO</h1>
                        <p><strong>Name: </strong>{foundOrder.name}</p>
                        <p><strong>Email: </strong>{foundOrder.email}</p>
                        <p><strong>Phone: </strong> {foundOrder.phone}</p>
                        <h1>PRODUCTS</h1>
                        <ul class="grid-container">
                            {foundOrder.products.map((product) => {
                                return (
                                    <li class="grid-item">
                                        <img src={product.product_image} alt="sekil.png"/>
                                        <p><strong>Product Name: </strong>{product.product_name}</p>
                                        <p><strong>Product Description: </strong>{product.product_description}</p>
                                        <p><strong>Product Count: </strong>{product.count}</p>
                                        <p><strong>Store Name: </strong>{product.store_name}</p>
                                        <p><strong>Store Address: </strong>{product.store_address}</p>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ) : (
                    <p>Good not found.</p>
                )}
            </div>
        </div>
    );
}


export default Order;