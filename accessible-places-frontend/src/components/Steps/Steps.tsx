import React, { useContext, useEffect, useState } from "react";
import { Button, Progress, HStack, Box, Flex } from "@chakra-ui/react";
import "./Steps.styles.css";
import { CheckIcon } from "@chakra-ui/icons";
import { CSSTransition } from "react-transition-group";
import { StepsContext } from "../../Context/StepsContext/StepsContext";

export const Steps = ({
  children,
  renderFinishComponent = () => <p>Finished!</p>,
}: {
  children: React.ReactNode[];
  renderFinishComponent?: () => JSX.Element;
}) => {
  const { currentStep, setTotalSteps, totalSteps } = useContext(StepsContext);

  const generateStepsControllerItems = () => {
    const stepControllerItems = [];

    for (let i = 0; i < totalSteps; i++) {
      stepControllerItems.push({
        index: i,
        component: <>{`${i + 1}`}</>,
      });
    }

    return stepControllerItems;
  };

  useEffect(() => {
    children.length && setTotalSteps(children.length)
  }, [children.length])

  const controllerItems = generateStepsControllerItems();

  return (
    <>
      <Flex
        w={"100%"}
        alignItems="center"
        justifyContent="space-between"
        paddingX={8}
      >
        {controllerItems.map((controllerItem, idx) => (
          <CSSTransition
            timeout={200}
            classNames="display-item"
            key={`step-controller-handler-${idx}`}
          >
            <>
              <Box
                borderRadius="50%"
                backgroundColor={currentStep > idx ? "green.500" : "gray.600"}
                border="4px"
                borderColor={currentStep === idx ? "green.500" : "transparent"}
                padding="5"
                w={15}
                h={15}
                display="flex"
                alignItems="center"
                justifyContent="center"
                className="display-item"
              >
                {currentStep > idx ? <CheckIcon /> : controllerItem.component}
              </Box>
              {idx !== totalSteps - 1 && (
                <Progress
                  value={currentStep > idx ? 100 : 0}
                  w={`${Math.floor(100 / totalSteps)}%`}
                  h={1}
                  colorScheme="green"
                  className="display-item"
                />
              )}
            </>
          </CSSTransition>
        ))}
      </Flex>

      <Box w={"100%"} padding={8}>
        {currentStep === totalSteps ? (
          <div key={"step-child-last"}>{renderFinishComponent()}</div>
        ) : (
          React.Children.map(children, (child, idx) => (
            <div
              className={idx === currentStep ? "active" : "inactive"}
              key={`step-child-${idx}`}
            >
              {child}
            </div>
          ))
        )}
      </Box>
    </>
  );
};
