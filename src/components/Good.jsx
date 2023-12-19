import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAddToBag } from "../store/fetchs";
import { addToBag } from "../store/reducer";

function Good() {
    let goods = useSelector((state) => state.goods.goodsArray);
    let { name } = useParams();
    let dispatch = useDispatch();

    const foundGood = goods.find(item => item.product_name === name);

    const postData = useSelector((state) => state.goods.postData);
    let [showElement, setShowElement] = useState(false);



    useEffect(() => {
        if (postData) {
            setShowElement(true);
        } else {
            setShowElement(false);
        }
    }, [postData]);


    const handleCloseModal = () => {
        setShowElement(false);
        dispatch(addToBag(null));
    };


    return (
        <div className="App">
            <div className="good">
                <div className="all">
                    {foundGood ? (
                        <div className="goodInfo">
                            <div className="goodImage"><img src={foundGood.product_image} width="400" height="auto"/></div>
                            <div className="goodDescription">
                                <h2>{foundGood.product_name}</h2>
                                <p><strong>Description: </strong>{foundGood.product_description}</p>
                                <p><strong>Price: </strong>{foundGood.product_price}</p>
                                <p><strong>Store Name: </strong>{foundGood.store_name}</p>
                                <p><strong>Store Address: </strong>{foundGood.store_address}</p>
                            </div>
                        </div>
                    ) : (
                        <p>Good not found.</p>
                    )}
                    <button onClick={() => {
                        dispatch(fetchAddToBag(foundGood))
                    }}
                    >ADD TO BASKET</button>
                </div>
            </div>


            {showElement && (
                <div className="modalElement">
                    <p>{postData}</p>
                    <br />
                    <button onClick={handleCloseModal}>CLOSE</button>
                </div>
            )}
        </div>
    );


}


export default Good;