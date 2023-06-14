import React from "react";
import { OrderReview } from "@/types/order";
import {
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalContent,
  Button,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OrderReviewForm from "../Forms/OrderReviewForm/OrderReviewForm";
import useAddOrderReview from "@/requests/order/hooks/useAddOrderReview";
import { addNotification } from "@/redux/notificationSlice/notificationSlice";
import useDeleteOrderReview from "@/requests/order/hooks/useDeleteOrderReview";
type Props = {
  orderId: number;
  orderReview?: OrderReview;
  disabled: boolean;
  onSubmit: () => unknown;
};
const OrderReviewHolder = ({
  orderReview,
  disabled,
  onSubmit,
  orderId,
}: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const addReview = useAddOrderReview();
  const dispatch = useDispatch();
  const deleteReview = useDeleteOrderReview();
  return (
    <>
      <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order Review</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDirection={"column"} gap={"2rem"}>
            <Box display={"flex"}>
              {orderReview && (
                <Button
                  onClick={async () => {
                    try {
                      await deleteReview(orderReview.id);
                      dispatch(
                        addNotification({
                          message: "Successfully removed review",
                          notificationType: "SUCCESS",
                        })
                      );
                      onSubmit();
                      onClose();
                    } catch (error) {
                      dispatch(
                        addNotification({
                          message: "Error removing a review",
                          notificationType: "ERROR",
                        })
                      );
                    }
                  }}
                >
                  Delete review
                </Button>
              )}
            </Box>
            <OrderReviewForm
              deliveryRating={orderReview?.deliveryRating || undefined}
              serviceRating={orderReview?.serviceRating || undefined}
              review={orderReview?.review || undefined}
              onSubmit={async (values) => {
                try {
                  await addReview(values, orderId);
                  dispatch(
                    addNotification({
                      message: "Review added",
                      notificationType: "SUCCESS",
                    })
                  );
                  onSubmit();
                  onClose();
                } catch (error) {
                  dispatch(
                    addNotification({
                      message: "Error adding a review",
                      notificationType: "ERROR",
                    })
                  );
                } finally {
                  Promise.resolve();
                }
              }}
            ></OrderReviewForm>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Button isDisabled={disabled} onClick={onOpen}>
        <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>
      </Button>
    </>
  );
};

export default OrderReviewHolder;
