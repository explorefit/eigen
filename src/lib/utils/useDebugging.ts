import AsyncStorage from "@react-native-community/async-storage"
import { useEffect } from "react"
import RNAsyncStorageFlipper from "rn-async-storage-flipper"

export const useDebugging = () => {
  useEffect(() => {
    RNAsyncStorageFlipper(AsyncStorage)
  }, [])
}
