import { GlobalStore } from "app/store/GlobalStore"
import { Formik } from "formik"
import { BulletedItem, CTAButton, Flex, Spacer } from "palette"
import React from "react"
import { UploadPhotosForm } from "./UploadPhotosForm"
import { isSizeLimitExceeded } from "./utils/calculatePhotoSize"
import { Photo, PhotosFormModel, photosValidationSchema } from "./validation"

export const UploadPhotos = ({ handlePress }: { handlePress: () => void }) => {
  const { submission } = GlobalStore.useAppState((state) => state.artworkSubmission)

  return (
    <Flex p={1} mt={1}>
      <Flex>
        <BulletedItem>
          To evaluate your submission faster, please upload high-quality photos of the work's front
          and back.
        </BulletedItem>
        <BulletedItem>
          If possible, include photos of any signatures or certificates of authenticity.
        </BulletedItem>
      </Flex>

      <Formik<PhotosFormModel>
        initialValues={submission.photos}
        onSubmit={handlePress}
        validationSchema={photosValidationSchema}
        validateOnMount
      >
        {({ values, isValid }) => {
          const isAnyPhotoLoading = values.photos.some((photo: Photo) => photo.loading)

          return (
            <>
              <UploadPhotosForm isAnyPhotoLoading={isAnyPhotoLoading} />
              <Spacer mt={2} />
              <CTAButton
                disabled={!isValid || isAnyPhotoLoading || isSizeLimitExceeded(values.photos)}
                onPress={handlePress}
                testID="Submission_Save_Photos_Button"
              >
                {!!isAnyPhotoLoading ? "Processing Photos..." : "Save & Continue"}
              </CTAButton>
            </>
          )
        }}
      </Formik>
    </Flex>
  )
}
