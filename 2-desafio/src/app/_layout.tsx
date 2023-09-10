import {
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
} from '@expo-google-fonts/montserrat'
import { useFonts } from 'expo-font'
import { Slot, SplashScreen } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { AppState, AppStateStatus } from 'react-native'
import { SWRConfig } from 'swr'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        Montserrat: Montserrat_400Regular,
        MontserratSemiBold: Montserrat_600SemiBold,
        MontserratBold: Montserrat_700Bold,
    })

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync()
        }
    }, [fontsLoaded])

    if (!fontsLoaded) {
        return null
    }

    return (
        <SWRConfig
            value={{
                provider: () => new Map(),
                isVisible: () => true,
                initFocus: callback => {
                    let appState = AppState.currentState

                    const onAppStateChange = (nextAppState: AppStateStatus) => {
                        /* If it's resuming from background or inactive mode to active one */
                        if (
                            appState.match(/inactive|background/) &&
                            nextAppState === 'active'
                        ) {
                            callback()
                        }
                        appState = nextAppState
                    }

                    // Subscribe to the app state change events
                    const subscription = AppState.addEventListener(
                        'change',
                        onAppStateChange
                    )

                    return () => {
                        subscription.remove()
                    }
                },
            }}
        >
            <Slot />
            <StatusBar style="auto" />
        </SWRConfig>
    )
}
