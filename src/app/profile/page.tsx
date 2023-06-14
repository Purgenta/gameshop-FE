"use client";
import React from "react";
import useGetProfile from "@/requests/user/hooks/useGetProfile";
import { Heading } from "@chakra-ui/react";
import style from "./page.module.css";
import OrderDetails from "@/components/Order/OrderDetails";
import OrderReviewHolder from "@/components/Order/OrderReviewHolder";
const Profile = () => {
  const { data, mutate } = useGetProfile();
  return (
    <main className={style["profile"]}>
      <ul className={style["user-information"]}>
        <li className={style["user-avatar-wrapper"]}>
          <img
            alt="user-avatar"
            className={style["user-avatar"]}
            src="https://www.knjizare-vulkan.rs/nb-public/themes/nbshop5_v5_8/_static/images/core/user.png"
          />
          {data && <Heading size={"sm"}>{data.email}</Heading>}
        </li>
        <li>
          <Heading size={"sm"}>
            Created at:
            <br></br>
            {data &&
              new Date(data.registered_at).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
          </Heading>
        </li>
      </ul>
      <section className={style["orders"]}>
        <Heading size={"md"} marginBottom={10} marginTop={5}>
          Your Orders:
        </Heading>
        {data && data.orders.length ? (
          <ul className={style["order-list"]}>
            {data.orders.map((order) => {
              return (
                <li key={order.id}>
                  <div className={style["order"]}>
                    <Heading size={"sm"}>
                      Order id: <br></br>
                      {order.id}
                    </Heading>
                    <Heading size={"sm"}>
                      Order status: <br></br> {order.orderStatus}
                    </Heading>
                    <OrderDetails
                      orderItems={order.cart.cartItems.map((item) => ({
                        game: item.game,
                        quantity: item.quantity,
                      }))}
                    />
                    <OrderReviewHolder
                      orderId={order.id}
                      orderReview={
                        order.orderReview ? order.orderReview : undefined
                      }
                      onSubmit={() => mutate()}
                      disabled={order.orderStatus !== "COMPLETED"}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <Heading size={"sm"}>No orders were made by you</Heading>
        )}
      </section>
    </main>
  );
};

export default Profile;
