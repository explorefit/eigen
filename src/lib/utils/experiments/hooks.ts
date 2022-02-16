import { useEffect, useState } from "react"
import { getUnleashClient } from "./unleashClient"
import { IMutableContext } from "unleash-proxy-client"

export function useExperiments() {
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  useEffect(() => {
    const client = getUnleashClient()

    client.on("ready", () => {
      console.log("unleashClient ready")
    })
    client.on("update", () => {
      console.log("unleashClient update")
      setLastUpdate(new Date())
    })
    client.on("error", () => {
      console.log("unleashClient error")
    })
    client.on("initialized", () => {
      console.log("unleashClient initialized")
    })
    client.on("impression", () => {
      console.log("unleashClient impression")
    })

    return () => {
      console.log("unleashClient stopping")
      client.stop()
    }
  }, [])
}

export function useExperimentFlag(name: string) {
