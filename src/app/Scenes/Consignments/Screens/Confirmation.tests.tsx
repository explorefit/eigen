import { dismissModal } from "app/navigation/navigate"
import { getTextTree } from "app/utils/getTestWrapper"
import React from "react"
import "react-native"
import Confirmation, { SubmissionTypes } from "./Confirmation"

jest.mock("@react-native-community/cameraroll", () => jest.fn())

const emptyProps = { navigator: {} as any }

describe("callbacks", () => {
  it("calls pop when done is tapped", () => {
    const navigator: any = { popToTop: jest.fn() }
    const confirmation = new Confirmation({ navigator })
    confirmation.restart()
    expect(navigator.popToTop).toHaveBeenCalled()
  })

  it("dismisses modal when done is tapped", () => {
    const confirmation = new Confirmation(emptyProps)
    confirmation.exitModal()
    expect(dismissModal).toHaveBeenCalled()
  })

  it("requests submission status after 1 second", () => {
    jest.useFakeTimers()

    const submissionRequestValidationCheck = jest.fn()
    const _confirm = new Confirmation({ ...emptyProps, submissionRequestValidationCheck })
    // tslint:disable-next-line:no-unused-expression
    _confirm

    jest.runOnlyPendingTimers()
    expect(submissionRequestValidationCheck).toHaveBeenCalled()
  })

  it("getting true back sets status to success", () => {
    jest.useFakeTimers()

    const submissionRequestValidationCheck = () => true
    const confirmation = new Confirmation({ ...emptyProps, submissionRequestValidationCheck })
    confirmation.setState = jest.fn()

    jest.runOnlyPendingTimers()
    expect(confirmation.setState).toHaveBeenCalledWith({ submissionState: "SuccessfulSubmission" })
  })

  it("getting false back sets status to fail", () => {
    jest.useFakeTimers()

    const submissionRequestValidationCheck = () => false
    const confirmation = new Confirmation({ ...emptyProps, submissionRequestValidationCheck })
    confirmation.setState = jest.fn()

    jest.runOnlyPendingTimers()
    expect(confirmation.setState).toHaveBeenCalledWith({ submissionState: "FailedSubmission" })
  })

  it("getting undefined back sets will make it run the check a second time", () => {
    jest.useFakeTimers()

    const submissionRequestValidationCheck = jest.fn()
    const confirmation = new Confirmation({ ...emptyProps, submissionRequestValidationCheck })
    confirmation.setState = jest.fn()

    submissionRequestValidationCheck.mockImplementationOnce(() => undefined)
    jest.runOnlyPendingTimers()

    submissionRequestValidationCheck.mockImplementationOnce(() => true)
    jest.runOnlyPendingTimers()

    expect(confirmation.setState).toHaveBeenCalledWith({ submissionState: "SuccessfulSubmission" })
  })
})

describe("state", () => {
  it("defaults to Submitting", () => {
    const artist = new Confirmation(emptyProps)
    expect(artist.state).toEqual({ submissionState: "Submitting" })
  })
})

describe("messaging", () => {
  it("Lets you know you've succeeded", () => {
    const expected = "Thank you for submitting your consignment"
    const state = SubmissionTypes.SuccessfulSubmission
    const confirmationText = getTextTree(<Confirmation {...emptyProps} initialState={state} />)
    expect(confirmationText).toContain(expected)
  })

  it("Lets you know your submission failed", () => {
    const expected = "Submission failed"
    const state = SubmissionTypes.FailedSubmission
    const confirmationText = getTextTree(<Confirmation {...emptyProps} initialState={state} />)
    expect(confirmationText).toContain(expected)
  })
})
