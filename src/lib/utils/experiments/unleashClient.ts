import AsyncStorage from "@react-native-community/async-storage"
import { IConfig, UnleashClient } from "unleash-proxy-client"
import { Platform } from "react-native"
import { Config } from "react-native-config"
import { useEffect } from "react"
export const getUnleashClient = () => {
  if (!_unleashClient) {
    _unleashClient = createUnleashClient()
    _unleashClient.start()
  }
  return _unleashClient
}

let _unleashClient: UnleashClient | null = null

const storagePrefix = "unleash-values:"

const createUnleashClient = () => {
      get: async (name) => {
        const data = await AsyncStorage.getItem(`${storagePrefix}${name}`)
        return data ? JSON.parse(data) : undefined
      },
    },
