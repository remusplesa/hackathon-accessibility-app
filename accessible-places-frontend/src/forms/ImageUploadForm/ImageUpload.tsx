import React, { useContext, useEffect } from "react";
import {
  Input,
  FormControl,
  FormHelperText,
  FormLabel,
  Button,
  Flex,
  FormErrorMessage,
  Card,
  CardBody,
  Image,
  AspectRatio,
  Text,
} from "@chakra-ui/react";
import {
  checkExistingImage,
  convertBase64,
  resizeFile,
} from "../../utils/utils";
import { StepsContext } from "../../Context/StepsContext/StepsContext";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { UploadFormContext } from "../../Context/UploadFormContext/UploadFormContext";
import { Place } from "../../utils/models";

const FILE_SIZE = 10_485_760;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg"];

const schema = yup
  .object()
  .shape({
    imageRaw: yup
      .mixed()
      .test("fileSize", "File too large", (value) => {
        const filesArray = Array.from((value as FileList) ?? []);
        const invalidFile = filesArray?.filter((item) => item.size > FILE_SIZE);
        return invalidFile.length === 0;
      })
      .test("fileFormat", "Unsupported Format", (value) => {
        const filesArray = Array.from((value as FileList) ?? []);
        const invalidFile = filesArray?.filter(
          (item) => !SUPPORTED_FORMATS.includes(item.type)
        );
        return invalidFile.length === 0;
      })
      .required("Please select an image")
      .nullable(),
  })
  .required();

export function ImageUpload() {
  const { currentStep, setCurrentStep, totalSteps } = useContext(StepsContext);
  const { formData, saveData } = useContext(UploadFormContext);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: {
      imageRaw: formData?.imageRaw || null,
    },
  });

  const onSubmit = async (data) => {
    const { imageRaw } = data;

    if (
      isSubmitSuccessful &&
      checkExistingImage(imageRaw as FileList, formData?.imageRaw).length ===
        (imageRaw as FileList).length
    ) {
      setCurrentStep(currentStep + 1);
    } else {
      let imageBase64: string[] = [];
      const files = Array.from(imageRaw);
      const dt = new DataTransfer();
      for (const file of files) {
        const resizedFile = await resizeFile(file as File);
        dt.items.add(resizedFile as File);
        const fileBase64 = await convertBase64(resizedFile as File);
        imageBase64.push(fileBase64 as string);
      }
      saveData({
        imageRaw: dt.files,
        imageBase64,
        boundingBoxes: null,
        imageUrl: null,
        predictions: null,
      });
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {history.state.usr?.photos?.length > 0 && (
        <Flex direction={"column"} gap={3}>
          <Text>Existing images</Text>
          <Flex
            justifyContent={"space-between"}
            wrap={"wrap"}
            alignItems="center"
            gap={3}
            paddingBottom={5}
          >
            {(history.state.usr as Pick<Place, "photos">)?.photos?.map(
              (photo, i) => (
                <Image
                  key={`${photo.id}_${i}`}
                  crossOrigin="anonymous"
                  src={photo.url}
                  fallbackSrc="https://via.placeholder.com/150"
                  alt={photo.id}
                  objectFit="cover"
                />
              )
            )}
          </Flex>
        </Flex>
      )}
      <FormControl isInvalid={errors.imageRaw && touchedFields.imageRaw}>
        <FormLabel>Choose one or multiple JPG/JPEG images</FormLabel>
        <Input
          type="file"
          multiple
          {...register("imageRaw")}
          sx={{
            "::file-selector-button": {
              height: 10,
              padding: 0,
              mr: 4,
              background: "none",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
            },
          }}
        />
        <FormErrorMessage>
          <>{errors.imageRaw?.message}</>
        </FormErrorMessage>
        <FormHelperText>*Size of one image must not exceed 10MB</FormHelperText>
      </FormControl>

      <Flex
        gap="2"
        paddingTop={14}
        paddingBottom={2}
        w="100%"
        justifyContent="space-between"
      >
        <Button
          onClick={() => setCurrentStep(currentStep - 1)}
          disabled={currentStep === 0}
          variant="outline"
        >
          Prev
        </Button>
        <Button
          type="submit"
          colorScheme="green"
          loadingText="Submitting"
          disabled={currentStep === totalSteps || !isValid}
        >
          Next
        </Button>
      </Flex>
    </form>
  );
}
