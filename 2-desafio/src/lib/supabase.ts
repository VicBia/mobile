import 'react-native-url-polyfill/auto'

import { createClient } from '@supabase/supabase-js'
import * as SecureStore from 'expo-secure-store'

import { Database } from '../types/database'

const ExpoSecureStoreAdapter = {
    getItem: (key: string) => {
        return SecureStore.getItemAsync(key)
    },
    setItem: (key: string, value: string) => {
        SecureStore.setItemAsync(key, value)
    },
    removeItem: (key: string) => {
        SecureStore.deleteItemAsync(key)
    },
}

const supabaseUrl = 'https://qgstfvisxdpcqpnnvoex.supabase.co'
const supabaseAnonKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnc3RmdmlzeGRwY3Fwbm52b2V4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIxNTAyODUsImV4cCI6MjAwNzcyNjI4NX0.C2RWNoor8eOf090R_s3ACU4E-croETkA89h_Yr2Bs-U'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: ExpoSecureStoreAdapter,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})
