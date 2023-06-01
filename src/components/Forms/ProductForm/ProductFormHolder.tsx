import React, { useEffect, useState } from "react";
import { Stepper } from "@chakra-ui/react";
import ProductForm from "./ProductForm";
import {
  StepIndicator,
  StepNumber,
  Box,
  StepDescription,
  StepTitle,
  StepStatus,
  StepSeparator,
  StepIcon,
  Step,
} from "@chakra-ui/react";
import { useSteps } from "@chakra-ui/react";
import { Game } from "@/types/game";
import ProductFormImages from "./ProductFormImages";
import { ProductValues } from "@/components/Product/EditProduct";
const steps = [
  {
    title: "Product details",
    description: "General information about the product",
  },
  {
    title: "Product images",
    description: "Add related images to the product",
  },
];
type ProductFormHolderProps = {
  game?: Game;
  onSubmit: (values: ProductValues) => unknown;
};
const ProductFormHolder = ({ game, onSubmit }: ProductFormHolderProps) => {
  const [formValues, setFormValues] = useState({
    title: game?.title || "",
    release_year: game?.releaseYear || new Date().getFullYear(),
    images: game?.gameImages.map((img) => img.url) || [],
    price: game?.price || 10,
    category_id: game?.category.id || 1,
    publisher_id: game?.publisher.publisher_id || 1,
    description: game?.description || "",
  });
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  useEffect(() => {
    if (activeStep === 2) {
      onSubmit(formValues);
    }
  }, [activeStep]);
  return (
    <>
      {activeStep === 0 && (
        <ProductForm
          onSubmit={(values) => {
            setActiveStep((index) => index + 1);
            setFormValues((prev) => {
              return { ...prev, ...values };
            });
          }}
          game={game}
        />
      )}
      {activeStep === 1 && (
        <ProductFormImages
          images={game?.gameImages || []}
          onSubmit={(values) => {
            setFormValues((prev) => {
              prev.images = values;
              return { ...prev };
            });
            setActiveStep((index) => index + 1);
          }}
        />
      )}
      <Stepper
        display={"flex"}
        flexDirection={"row"}
        flexWrap={"wrap"}
        index={activeStep}
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default ProductFormHolder;
