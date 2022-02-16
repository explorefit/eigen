import { GlobalStore } from "lib/store/GlobalStore"
import { useEffect } from "react"
import { updateExperimentsContext } from "./experiments/hooks"
import { nullToUndef } from "./nullAndUndef"
import { SegmentTrackingProvider } from "./track/SegmentTrackingProvider"

export const useIdentifyUser = () => {
  const userId = GlobalStore.useAppState((store) => store.auth.userID)

  useEffect(() => {
    console.log("userId", userId)

    SegmentTrackingProvider.identify?.(userId, { is_temporary_user: userId === null ? 1 : 0 })
    updateExperimentsContext({ userId: nullToUndef(userId) })
  }, [userId])
}
