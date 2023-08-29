import '@/styles/global.css'

import { MaterialIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

export default function () {
    return (
        <Tabs
            initialRouteName="index"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#7C9682',
                tabBarInactiveTintColor: '#00000033',
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="add" color={color} size={size} />
                    ),
                    tabBarShowLabel: false,
                }}
            />
            <Tabs.Screen
                name="list"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="list" color={color} size={size} />
                    ),
                    tabBarShowLabel: false,
                }}
            />
        </Tabs>
    )
}
