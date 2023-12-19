import { startTransition, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddToOrders, fetchDeleteFromBag, fetchGetMyBag, fetchUpdateCount } from "../store/fetchs";
import { addToOrders, deletedBag } from "../store/reducer";



function MyBag() {
    let myBag = useSelector((state) => state.goods.myBagArray);
    let dispatch = useDispatch();
    let [flag, setFlag] = useState(false)

    // order 
    let [name, setName] = useState('')
    let [email, setEmail] = useState('')
    let [phone, setPhone] = useState('')

    // search
    const [searchValue, setSearchValue] = useState('')


    //
    const deleteDataFromBag = useSelector((state) => state.goods.deleteDataFromBag);
    let [showElement, setShowElement] = useState(false);

    //
    const postDataToOrders = useSelector((state) => state.goods.postDataToOrders);
    let [showElementOrder, setShowElementOrder] = useState(false);




    const [sortOrder, setSortOrder] = useState('')

    const sortGoodsByPrice = (order) => {
        let sortedGoods = [...myBag];
        sortedGoods.sort((a, b) => {
            if (order === 'increase') {
                return parseFloat(a.product_price) - parseFloat(b.product_price);
            }
            else if (order === 'decrease') {
                return parseFloat(b.product_price) - parseFloat(a.product_price);
            }
            return 0;
        })
        return sortedGoods;
    }

    const handleSortChange = (event) => {
        setSortOrder(event.target.value)
    }


    useEffect(() => {
        dispatch(fetchGetMyBag())
    }, [dispatch, flag])


    let sortedGoods = sortOrder ? sortGoodsByPrice(sortOrder) : myBag;


    const filteredGoods = sortedGoods.filter(item =>
        item.product_name.toLowerCase().includes(searchValue.toLowerCase())
    );


    const calculateTotalPrice = () => {
        let totalPrice = 0;
        sortedGoods.forEach((item) => {
            totalPrice += parseFloat(item.product_price * item.count)
        })
        return totalPrice.toFixed(2)
    }

    const handleDecrease = (item) => {
        const updatedCount = item.count - 1;
        if (updatedCount >= 1) {
            dispatch(fetchUpdateCount(item, updatedCount))
            setFlag(!flag)
        }
    }

    const handleIncrease = (item) => {
        const updatedCount = item.count + 1;
        dispatch(fetchUpdateCount(item, updatedCount))
        setFlag(!flag)
    }


    const handleSubmit = () => {
        const orderObject = {
            name: name,
            email: email,
            phone: phone,
            products: sortedGoods
        }


        if (!name || !email || !phone) {
            alert("Please fill in all fields.");
            return;
        }

        dispatch(fetchAddToOrders(orderObject));

        sortedGoods.forEach(item => {
            dispatch(fetchDeleteFromBag(item));
        });
    }


    useEffect(() => {
        if (deleteDataFromBag) {
            setShowElement(true);
        } else {
            setShowElement(false);
        }
    }, [deleteDataFromBag]);



    useEffect(() => {
        if (postDataToOrders) {
            setShowElementOrder(true);
        } else {
            setShowElementOrder(false);
        }
    }, [postDataToOrders]);


    const handleCloseModal = () => {
        setShowElement(false);
        dispatch(deletedBag(null));
    };

    const handleCloseModalOrder = () => {
        setShowElementOrder(false);
        dispatch(addToOrders(null));
    };


    return (
        <div className="App">
            <div className="main-container">

                <div className="form-container">
                    <div>
                        <h2>Total Price: ${calculateTotalPrice()}</h2>
                    </div>
                    <form>
                        <label htmlFor="nameInput">Name: </label>
                        <input type="text" id="nameInput" value={name} onChange={(e) => setName(e.target.value)} required />
                        <label htmlFor="emailInput">Email: </label>
                        <input type="email" id="emailInput" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <label htmlFor="phoneInput">Phone: </label>
                        <input type="tel" id="phoneInput" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                        <button onClick={handleSubmit}>Confirm Order</button>
                    </form>
                </div>

                <div className="content-container">
                    <div className="my-bag-search-sort-bar">
                        <div className="my-bag-search-bar">
                            <input
                                type="text"
                                placeholder="Search by product name"
                                value={searchValue}
                                onChange={(e) => {
                                    setSearchValue(e.target.value)
                                }}
                            />
                        </div>

                        <div className="my-bag-sort-bar">
                            <label htmlFor="sortSelect">Sort by Price:</label>
                            <select id="sortSelect" onChange={handleSortChange} value={sortOrder}>
                                <option value="">Select</option>
                                <option value="increase">Low to High</option>
                                <option value="decrease">High to Low</option>
                            </select>
                        </div>
                    </div>

                    <div className="my-bag-main">
                        <ul class="grid-container">
                            {filteredGoods.map((item) => {
                                return (
                                    <li class="grid-item">
                                        <img src={item.product_image} alt="image"/>
                                        <p>{item.product_name}</p>
                                        <p>{item.product_description}</p>
                                        <p>{item.product_price}</p>
                                        <div className="increase-decrease-div">
                                            <button onClick={() => {
                                                handleDecrease(item)
                                            }}>-</button>
                                            <span>{item.count}</span>
                                            <button onClick={() => {
                                                handleIncrease(item)
                                            }}>+</button>
                                        </div>
                                        <br />
                                        <div>
                                            <button onClick={() => {
                                                dispatch(fetchDeleteFromBag(item))
                                                setFlag(!flag)
                                            }}>DELETE</button>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>

            {showElement && (
                <div className="modalElement">
                    <p>{deleteDataFromBag}</p>
                    <br />
                    <button onClick={handleCloseModal}>CLOSE</button>
                </div>
            )}

            {showElementOrder && (
                <div className="modalElement">
                    <p>{postDataToOrders}</p>
                    <br />
                    <button onClick={handleCloseModalOrder}>CLOSE</button>
                </div>
            )}
        </div>
    );


}


export default MyBag;