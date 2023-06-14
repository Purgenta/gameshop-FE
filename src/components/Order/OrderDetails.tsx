import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalContent,
  Button,
} from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import style from "./OrderDetails.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDisclosure } from "@chakra-ui/react";
import { Game } from "@/types/game";
import { faEye } from "@fortawesome/free-regular-svg-icons";
type Props = {
  orderItems: Array<{ game: Game; quantity: number }>;
};
const OrderDetails = ({ orderItems }: Props) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  console.log(orderItems);
  return (
    <>
      <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order Items</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            padding={"10"}
            display={"flex"}
            flexDirection={"column"}
            gap={"2rem"}
          >
            <ul className={style["order-items"]}>
              {orderItems.map((order) => {
                const { game, quantity } = order;
                return (
                  <li className={style["order-item"]} key={game.id}>
                    <Heading size="sm">{game.title}</Heading>
                    <Heading size="sm">{quantity}x</Heading>
                  </li>
                );
              })}
            </ul>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Button onClick={onOpen}>
        <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
      </Button>
    </>
  );
};

export default OrderDetails;
