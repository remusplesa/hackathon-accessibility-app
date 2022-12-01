import React, { useContext, useEffect, useRef } from "react";
import {
  Input,
  FormControl,
  FormHelperText,
  FormLabel,
  Button,
  Flex,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useUploadUrl } from "../../logic/hooks/useUploadUrl";
import { convertBase64, resizeFile, uploadToAzure } from "../../utils/utils";
import { StepsContext } from "../../Context/StepsContext/StepsContext";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { UploadFormContext } from "../../Context/UploadFormContext/UploadFormContext";
import { percentToValue } from "@chakra-ui/utils";

const FILE_SIZE = 2097152;
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg"
];

const schema = yup.object().shape({
  imageRaw: yup.mixed()
    .test("fileSize",
      "File too large",
      value => {
        const filesArray = Array.from((value as FileList))
        const invalidFile = filesArray?.filter(item => item.size > FILE_SIZE)
        return invalidFile.length === 0
      }
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      value => {
        const filesArray = Array.from((value as FileList))
        const invalidFile = filesArray?.filter(item => !SUPPORTED_FORMATS.includes(item.type))
        return invalidFile.length === 0
      }
    ).required('Please select an image').nullable(),
}).required();

export function ImageUpload() {
  const { currentStep, setCurrentStep, totalSteps } = useContext(StepsContext);
  const { formData, saveData } = useContext(UploadFormContext)

  const { register, handleSubmit, formState: { errors, touchedFields, isValid, isSubmitSuccessful } } = useForm({
    resolver: yupResolver(schema), mode: "all",
    defaultValues: {
      imageRaw: formData?.imageRaw
    }
  });

  const checkExistingImage = (currentFormImages: FileList, contextImages: FileList) => {
    return Array.from(currentFormImages).filter((img, id) => {
      return contextImages.item(id)?.name === img.name
    })

  }


  const onSubmit = async (data) => {
    const { imageRaw } = data


    if (isSubmitSuccessful && checkExistingImage((imageRaw as FileList), formData?.imageRaw).length === (imageRaw as FileList).length) {
      setCurrentStep(currentStep + 1)
    } else {
      let imageBase64: string[] = []
      const files = Array.from(imageRaw)
      const dt = new DataTransfer();
      for (const file of files) {
        const resizedFile = await resizeFile((file as File))
        dt.items.add((resizedFile as File))
        const fileBase64 = await convertBase64((resizedFile as File))
        imageBase64.push((fileBase64 as string))
      }
      saveData({ imageRaw: dt.files, imageBase64 })
      setCurrentStep(currentStep + 1)
    }


  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.imageRaw && touchedFields.imageRaw}>
        <FormLabel >Choose one or multiple JPG/JPEG images</FormLabel>
        <Input
          type="file"
          multiple
          {...register("imageRaw")}
        />
        <FormErrorMessage>
          <>{errors.imageRaw?.message}</>
        </FormErrorMessage>
        <FormHelperText>*Size of one image must not exceed 2MB</FormHelperText>
      </FormControl>

      <Flex gap="2" paddingY={8} w="100%" justifyContent="space-between">
        <Button
          onClick={() => setCurrentStep(currentStep - 1)}
          disabled={currentStep === 0}
          variant="outline"
        >
          Prev
        </Button>
        <Button
          type="submit"
          colorScheme='green'
          loadingText='Submitting'
          disabled={currentStep === totalSteps || !isValid}
        >
          Next
        </Button>
      </Flex>
    </form>
  );
}
