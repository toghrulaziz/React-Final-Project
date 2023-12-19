import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetGoods, fetchSearchGoodsinGoods } from "../store/fetchs";
import { Link } from "react-router-dom";



function Goods() {
    let goods = useSelector((state) => state.goods.goodsArray);
    let searchResults = useSelector((state) => state.goods.searchResultsGoods)
    let dispatch = useDispatch();

    let [displayGoods, setDisplayGoods] = useState([]);

    const [sortOrder, setSortOrder] = useState('')

    // search
    const [searchValue, setSearchValue] = useState('')

    // Locale Storage
    let [categoryCounts, setCategoryCounts] = useState({});


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
        dispatch(fetchGetGoods())
    }, [dispatch])


    useEffect(() => {
        if (searchValue !== '') {
            dispatch(fetchSearchGoodsinGoods(searchValue))
        }
    }, [searchValue, dispatch])


    useEffect(() => {
        let updatedGoods = searchValue !== '' ? searchResults : goods;

        if (sortOrder !== '') {
            updatedGoods = sortGoodsByPrice(updatedGoods, sortOrder);
        }

        setDisplayGoods(updatedGoods)
    }, [searchValue, sortOrder, goods, searchResults]);



    useEffect(() => {
        const maleCount = localStorage.getItem('Kişi') || 0;
        const femaleCount = localStorage.getItem('Qadın') || 0;

        setCategoryCounts({
            ...categoryCounts,
            'Kişi': parseInt(maleCount),
            'Qadın': parseInt(femaleCount),
        });
    }, []);

    const handleClick = (productName) => {
        const category = productName.split(' ')[0];
        const currentCount = localStorage.getItem(category) || 0;
        localStorage.setItem(category, parseInt(currentCount) + 1);

        const maleCount = localStorage.getItem('Kişi') || 0;
        const femaleCount = localStorage.getItem('Qadın') || 0;

        setCategoryCounts({
            ...categoryCounts,
            'Kişi': parseInt(maleCount),
            'Qadın': parseInt(femaleCount),
        });

        console.log(categoryCounts);
    };



    useEffect(() => {
        let updatedGoods = searchValue !== '' ? searchResults : goods;

        if (sortOrder !== '') {
            updatedGoods = sortGoodsByPrice(updatedGoods, sortOrder);
        }


        const sortedGoods = [...updatedGoods].sort((a, b) => {
            const categoryA = a.product_name.startsWith('Kişi') ? 'Kişi' : 'Qadın';
            const categoryB = b.product_name.startsWith('Kişi') ? 'Kişi' : 'Qadın';

            return categoryCounts[categoryB] - categoryCounts[categoryA];
        });


        setDisplayGoods(sortedGoods);
    }, [searchValue, sortOrder, goods, searchResults, categoryCounts]);




    return (
        <div className="App">
            <div className="goods">
                <div className="goods-search-sort-bar">
                    <div className="goods-search-bar">
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


                    <div className="goods-sort-bar">
                        <label htmlFor="sortSelect">Sort by Price:</label>
                        <select id="sortSelect" onChange={handleSortChange} value={sortOrder}>
                            <option value="">Select</option>
                            <option value="increase">Low to High</option>
                            <option value="decrease">High to Low</option>
                        </select>
                    </div>
                </div>


                <div className="goods-main">
                    <ul class="grid-container">
                        {displayGoods.map((item) => {
                            return (
                                <li class="grid-item" key={item.id} onClick={() => handleClick(item.product_name)}>
                                    <Link to={`/goods/${item.product_name}`}>
                                        <img src={item.product_image} alt="image"/>
                                        <p>{item.product_name}</p>
                                        <p>{item.product_description}</p>
                                        <p>{item.product_price}</p>
                                        <p>{item.product_quantity}</p>
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


export default Goods;