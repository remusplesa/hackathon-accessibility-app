import { Text } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import { UploadFormContext } from '../../Context/UploadFormContext/UploadFormContext'

export const FinalForm = () => {
    const { formData } = useContext(UploadFormContext)

    useEffect(() => {
        formData && console.log(formData)
    }, [])
    return (
        <Text>
            Finished!
        </Text>
    )
}
