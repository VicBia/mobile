import { Stack } from 'expo-router'
import '@/styles/global.css'
import {
    useFonts,
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
} from '@expo-google-fonts/inter'
import * as SplashScreen from 'expo-splash-screen'
import React, { useEffect } from 'react'
import { SWRConfig } from 'swr'
import { AppState, AppStateStatus, View } from 'react-native'
import { GluestackUIProvider } from '@/components'
import { config } from '../../gluestack-ui.config'
import { Text } from 'react-native'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        Inter: Inter_400Regular,
        InterSemiBold: Inter_600SemiBold,
        InterBold: Inter_700Bold,
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
                initFocus: (callback) => {
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
            <GluestackUIProvider config={config.theme}>
                <View className="flex-1 bg-indigo-50 dark:bg-slate-950">
                    <Stack
                        screenOptions={{
                            headerShown: false,
                            contentStyle: {
                                backgroundColor: 'transparent',
                            },
                        }}
                    />
                </View>
            </GluestackUIProvider>
        </SWRConfig>
    )
}
