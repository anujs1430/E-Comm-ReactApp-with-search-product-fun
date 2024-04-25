import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import toast from "react-hot-toast";

const Cart = () => {
  const { cartItems, subTotal, Shipping, tax, total } = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    dispatch({ type: "removeFromCart", payload: id });
    dispatch({ type: "calculation" });
    toast.error("Item Removed");
  };

  const incrementHandler = (id) => {
    dispatch({ type: "addToCart", payload: { id } });
    dispatch({ type: "calculation" });
  };

  const decrementHandler = (id) => {
    dispatch({ type: "decrementQty", payload: id });
    dispatch({ type: "calculation" });
  };

  if (cartItems == 1) {
  }

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

      {cartItems == 0 ? null : (
        <div>
          <table className="for-sm-device">
            <tbody>
              <tr>
                <th width="50%">Sub Total:</th>
                <td width="50%">${subTotal}</td>
              </tr>
              <tr>
                <th>Shipping:</th>
                <td>${Shipping}</td>
              </tr>
              <tr>
                <th>Tax:</th>
                <td>${tax}</td>
              </tr>
              <tr>
                <th>Total:</th>
                <td>${total}</td>
              </tr>
              <tr>
                <th colSpan={"2"} width="100%">
                  NOTE: asdf asf asdf sdf asd aef asdf
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      )}
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
        <img src={imgSrc} alt={"Image 1"} />
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
        {qty > 1 ? (
          <button onClick={() => decrementHandler(id)}>
            {qty === 1 ? <MdDeleteForever className="deleteBtn" /> : "-"}
          </button>
        ) : (
          <button className="deleteBtn" onClick={() => decrementHandler(id)}>
            {qty === 1 ? <MdDeleteForever /> : "-"}
          </button>
        )}
      </div>
      <div
        style={{
          display: "grid",
          placeContent: "center",
        }}
      >
        <button className="deleteBtn" onClick={() => deleteHandler(id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Cart;
