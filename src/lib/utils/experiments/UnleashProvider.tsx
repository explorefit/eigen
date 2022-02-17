import { useDevToggle } from "lib/store/GlobalStore"
import React, { createContext, ReactNode, useEffect, useState } from "react"
import { getUnleashClient } from "./unleashClient"

interface UnleashContext {
  lastUpdate: Date | null
}

export const UnleashContext = createContext<UnleashContext>({ lastUpdate: null })

export function UnleashProvider({ children }: { children?: ReactNode }) {
  const [lastUpdate, setLastUpdate] = useState<UnleashContext["lastUpdate"]>(null)
  const unleashEnv = useDevToggle("DTUseProductionUnleash") || !__DEV__ ? "production" : "staging"

  useEffect(() => {
    const client = getUnleashClient(unleashEnv)

    client.on("initialized", () => {
      console.debug("Unleash initialized")
    })

    client.on("ready", () => {
      console.debug("Unleash ready")
    })

    client.on("update", () => {
      console.debug("Unleash update")
      setLastUpdate(new Date())
    })

    client.on("error", () => {
      console.error("Unleash error")
    })

    client.on("impression", () => {
      console.debug("Unleash impression")
    })

    return () => {
      console.debug("Unleash stopping")
      client.stop()
    }
  }, [unleashEnv])

  return <UnleashContext.Provider value={{ lastUpdate }}>{children}</UnleashContext.Provider>
}
