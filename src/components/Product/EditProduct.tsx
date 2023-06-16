import { Game } from "@/types/game";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalContent,
  Flex,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import ProductFormHolder from "../Forms/ProductForm/ProductFormHolder";
import { ReactNode } from "react";
type EditProductProps = {
  game?: Game;
  onSubmit: (values: ProductValues) => unknown;
  children?: ReactNode;
  type: "add product" | "edit product";
};
export type ProductValues = {
  title: string;
  price: number;
  description: string;
  images: string[];
  publisher_id: number;
  category_id: number;
  release_year: number;
};
const EditProduct = ({ game, onSubmit, children, type }: EditProductProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Game</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDirection={"column"} gap={"2rem"}>
            <ProductFormHolder
              onSubmit={(values) => {
                onSubmit(values);
                onClose();
              }}
              game={game}
            ></ProductFormHolder>
          </ModalBody>
        </ModalContent>
      </Modal>
      {type === "add product" && (
        <Flex
          gap={"0.4rem"}
          alignItems={"center"}
          justifyContent={"center"}
          onClick={onOpen}
        >
          {children}
          <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
        </Flex>
      )}
      {type === "edit product" && (
        <FontAwesomeIcon onClick={onOpen} icon={faPen}></FontAwesomeIcon>
      )}
    </>
  );
};

export default EditProduct;
