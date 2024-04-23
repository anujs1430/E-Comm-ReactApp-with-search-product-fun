import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, subTotal, Shipping, tax, total } = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    dispatch({ type: "removeFromCart", payload: id });
    dispatch({ type: "calculation" });
  };

  const incrementHandler = (id) => {
    dispatch({ type: "addToCart", payload: { id } });
    dispatch({ type: "calculation" });
  };

  const decrementHandler = (id) => {
    dispatch({ type: "decrementQty", payload: id });
    dispatch({ type: "calculation" });
  };

  // if (cartItems.length === 0) {
  //   window.location.href = "/";
  // }

  return (
    <div className="cartList">
      <div className="max-w-80">
        {cartItems == 0 ? (
          <Link to={"/"}>
            <img
              className="emptyCartImg"
              src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-5521508-4610092.png"
            />
          </Link>
        ) : (
          cartItems.map((i) => (
            <Cartdata
              key={i.id}
              id={i.id}
              imgSrc={i.imgSrc}
              title={i.title}
              price={i.price}
              description={i.description}
              qty={i.qty}
              deleteHandler={deleteHandler}
              incrementHandler={incrementHandler}
              decrementHandler={decrementHandler}
            />
          ))
        )}
      </div>
      <aside>
        <h5>Sub Total: ${subTotal}</h5>
        <h5>Shipping: ${Shipping}</h5>
        <h5>Tax: ${tax}</h5>
        <h3>Total: ${total}</h3>
      </aside>
    </div>
  );
};

const Cartdata = ({
  imgSrc,
  title,
  price,
  description,
  incrementHandler,
  decrementHandler,
  id,
  deleteHandler,
  qty,
}) => {
  return (
    <div className="cart mt-3">
      <div>
        <img src={imgSrc} alt="" />
      </div>
      <div>
        <h4>{title}</h4>
      </div>
      <div className="priceDesc">
        <h4>$ {price}</h4>
        <p className="mt-3">{description}</p>
      </div>
      <div className="increSection">
        <button onClick={() => incrementHandler(id)}>+</button>
        <p>{qty}</p>
        <button onClick={() => decrementHandler(id)}>-</button>
      </div>
      <div
        style={{
          display: "grid",
          placeContent: "center",
        }}
      >
        <button onClick={() => deleteHandler(id)}>Delete</button>
      </div>
    </div>
  );
};

export default Cart;
