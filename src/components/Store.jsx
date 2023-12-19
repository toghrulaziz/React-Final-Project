import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAddToGoods, fetchDeleteFromGoods, fetchEditData, fetchGetGoods, fetchSearchGoods } from "../store/fetchs";
import { useEffect, useState } from "react";
import { addToGoods, deletedGoods, editData } from "../store/reducer";


function Store() {
    let goods = useSelector((state) => state.goods.goodsArray);
    let searchResults = useSelector((state) => state.goods.searchResultsAdmin)
    let [displayGoods, setDisplayGoods] = useState([])

    let { storeName } = useParams();
    let dispatch = useDispatch();
    let [flag, setFlag] = useState(false);

    let [selectedObject, setSelectedObject] = useState({});
    let [showModal, setShowModal] = useState(false);
    const [changedObject, setChangedObject] = useState(null);
    const [newObject, setNewObject] = useState(null)
    const [modalOpen, setModalOpen] = useState(false);
    let filteredGoods = goods.filter(item => item.store_name === storeName);
    let filterSearchResults = searchResults.filter(item => item.store_name === storeName)


    const storeAddresses = filteredGoods.map(item => item.store_address);

    const [sortOrder, setSortOrder] = useState('')


    // search

    const [searchValue, setSearchValue] = useState('');


    // edited modal
    let adminEdited = useSelector(state => state.goods.adminEdited);
    let [showElement, setShowElement] = useState(false);



    // deleted modal
    const deleteDataFromGoods = useSelector((state) => state.goods.deleteDataFromGoods);
    let [showElementDeleted, setShowElementDeleted] = useState(false);


    // added modal
    const newGood = useSelector((state) => state.goods.newGood);
    let [showElementAdded, setShowElementAdded] = useState(false);


    const sortGoodsByPrice = (array, order) => {
        let sortedGoods = [...array];
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
        dispatch(fetchGetGoods());
    }, [flag])


    useEffect(() => {
        if (searchValue !== '') {
            dispatch(fetchSearchGoods(searchValue))
        }
    }, [searchValue, dispatch])


    useEffect(() => {
        let updatedGoods = searchValue !== '' ? filterSearchResults : filteredGoods;

        if (sortOrder !== '') {
            updatedGoods = sortGoodsByPrice(updatedGoods, sortOrder);
        }

        setDisplayGoods(updatedGoods)
    }, [searchValue, sortOrder, goods, searchResults]);


    useEffect(() => {
        if (adminEdited) {
            setShowElement(true);
        } else {
            setShowElement(false);
        }
    }, [adminEdited]);



    useEffect(() => {
        if (deleteDataFromGoods) {
            setShowElementDeleted(true);
        } else {
            setShowElementDeleted(false);
        }
    }, [deleteDataFromGoods]);


    useEffect(() => {
        if (newGood) {
            setShowElementAdded(true);
        } else {
            setShowElementAdded(false);
        }
    }, [newGood]);



    // EDIT
    const openModal = (product) => {
        setShowModal(true);
        setChangedObject(product);
        setSelectedObject(product);
    }


    const handleUpdate = () => {
        setFlag(!flag)
        dispatch(fetchEditData(selectedObject, changedObject));
        setShowModal(false);
    };


    const handleCloseModal = () => {
        setShowElement(false);
        dispatch(editData(null));
    };


    const handleCloseModalDeleted = () => {
        setShowElementDeleted(false);
        dispatch(deletedGoods(null));
    };


    const handleCloseModalAdded = () => {
        setShowElementAdded(false);
        dispatch(addToGoods(null));
    };



    return (
        <div className="App">
            <div className="store">
                <div className="store-search-sort-bar">
                    <div className="add-button-container">
                        {/* add */}
                        <button onClick={() => {
                            setModalOpen(true);
                        }}>ADD GOOD</button>
                    </div>

                    <div className="store-search-bar">
                        {/* search */}
                        <input
                            type="text"
                            placeholder="Search by product name"
                            value={searchValue}
                            onChange={(e) => {
                                setSearchValue(e.target.value)
                            }}
                        />
                    </div>


                    {/* sort */}
                    <div className="store-sort-bar">
                        <label htmlFor="sortSelect">Sort by Price:</label>
                        <select id="sortSelect" onChange={handleSortChange} value={sortOrder}>
                            <option value="">Select</option>
                            <option value="increase">Low to High</option>
                            <option value="decrease">High to Low</option>
                        </select>
                    </div>
                </div>

                <div className="store-main">
                    <ul class="grid-container">
                        {displayGoods.map((item) => {
                            return (
                                <li class="grid-item">
                                    <img src={item.product_image} alt="image"/>
                                    <p>{item.product_name}</p>
                                    <p>{item.product_description}</p>
                                    <p>{item.product_price}</p>

                                    <button onClick={() => {
                                        openModal(item)
                                    }}
                                    >EDIT</button>
                                    <button onClick={() => {
                                        dispatch(fetchDeleteFromGoods(item));
                                        setFlag(!flag);
                                    }}
                                    >DELETE</button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>


            {showModal && (
                <div className="modal">
                    <h2>Edit Product</h2>
                    <p>{changedObject?.product_name}</p>
                    <input
                        type="text"
                        value={changedObject?.product_description}
                        onChange={(e) => setChangedObject(prevState => ({ ...prevState, product_description: e.target.value }))}
                    />
                    <input
                        type="number"
                        value={changedObject?.product_price}
                        onChange={(e) => setChangedObject(prevState => ({ ...prevState, product_price: e.target.value }))}
                    />
                    <br />
                    <br />
                    <button onClick={handleUpdate}>EDIT</button>
                    <button onClick={() => setShowModal(false)}>CLOSE</button>
                </div>
            )}



            {modalOpen && (
                <div className="modal">
                    <h2>Add Product</h2>
                    <input
                        type="text"
                        value={newObject?.product_name}
                        placeholder="Product Name"
                        onChange={(e) => setNewObject(prevState => ({ ...prevState, product_name: e.target.value }))}
                    />
                    <input
                        type="text"
                        value={newObject?.product_description}
                        placeholder="Product Description"
                        onChange={(e) => setNewObject(prevState => ({ ...prevState, product_description: e.target.value }))}
                    />
                    <input
                        type="number"
                        value={newObject?.product_price}
                        placeholder="Product Price"
                        onChange={(e) => setNewObject(prevState => ({ ...prevState, product_price: e.target.value }))}
                    />
                    <input
                        type="text"
                        defaultValue={storeName}
                        value={storeName}
                        disabled={true}
                    />
                    <input
                        type="text"
                        defaultValue={storeAddresses[0]}
                        value={storeAddresses[0]}
                        disabled={true}
                    />
                    <br />
                    <br />
                    <button onClick={() => {
                        newObject.store_name = storeName
                        newObject.store_address = storeAddresses[0]
                        newObject.id = Date.now()
                        dispatch(fetchAddToGoods(newObject))
                        setModalOpen(false)
                        setFlag(!flag)
                        setNewObject(null)
                    }}>Add</button>
                    <button onClick={() =>
                        setModalOpen(false)
                    }>Close</button>
                </div>
            )}


            {showElement && (
                <div className="modalElement">
                    <p>{adminEdited}</p>
                    <br />
                    <button onClick={handleCloseModal}>CLOSE</button>
                </div>
            )}


            {showElementDeleted && (
                <div className="modalElement">
                    <p>{deleteDataFromGoods}</p>
                    <br />
                    <button onClick={handleCloseModalDeleted}>CLOSE</button>
                </div>
            )}


            {showElementAdded && (
                <div className="modalElement">
                    <p>{newGood}</p>
                    <br />
                    <button onClick={handleCloseModalAdded}>CLOSE</button>
                </div>
            )}

        </div>
    );
}


export default Store;