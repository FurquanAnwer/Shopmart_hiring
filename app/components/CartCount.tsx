"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const CartCount = () => {
  const router = useRouter();
  const items = useSelector((state: RootState) => state.cart.items);

  // calculate total quantity
  const quantityNumbers = items.reduce((acc, item) => acc + item.quantity, 0);

  const navigateToCart = () => {
    router.push("/cart");
  };

  return (
    <div className="flex items-center">
      <div
        className="relative flex items-center cursor-pointer"
        onClick={navigateToCart}
      >
        {/* Cart Icon */}
        <FontAwesomeIcon icon={faShoppingCart} className="text-white text-3xl" />

        {/* Count Badge */}
        <span className="absolute -top-2 -right-2 bg-white text-black rounded-full px-2 text-xs font-bold">
          {quantityNumbers}
        </span>
      </div>
    </div>
  );
};

export default CartCount;
