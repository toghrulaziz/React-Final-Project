import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetGoods, fetchGetOrders } from "../store/fetchs";
import { Link } from "react-router-dom";




function Admin() {
    let goods = useSelector((state) => state.goods.goodsArray);
    let dispatch = useDispatch();

    let orders = useSelector((state) => state.goods.ordersArray);

    let uniqueStoreNames = [...new Set(goods.map(item => item.store_name))];


    useEffect(() => {
        dispatch(fetchGetGoods());
        dispatch(fetchGetOrders());
    }, [dispatch])

    return (
        <div className="App">
            <div className="admin">
                <h1>STORES</h1>
                <div className="admin-stores">
                    <ul class="grid-container">
                        {uniqueStoreNames.map((item) => {
                            return (
                                <li class="grid-item">
                                    <Link to={`/admin/${item}`}>
                                        <p>{item}</p>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <h1>Orders</h1>
                <div className="admin-orders">
                    <ul class="grid-container">
                        {orders.map((item) => {
                            return (
                                <li class="grid-item">
                                    <Link to={`/order/${item.name}`}>
                                        <p>Orderer Name: {item.name}</p>
                                        <p>Orderer Email: {item.email}</p>
                                        <p>Orderer Phone: {item.phone}</p>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>

            </div>
        </div>
    );

}


export default Admin;