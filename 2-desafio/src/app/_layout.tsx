import {
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
} from '@expo-google-fonts/montserrat'
import { useFonts } from 'expo-font'
import { Slot, SplashScreen } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'

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
        <>
            <Slot />
            <StatusBar style="auto" />
        </>
    )
}
