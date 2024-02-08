"use client"
import {create , StoreApi } from 'zustand'

interface CurrentUserState {
    email : string | null;
    setEmail : (newEmail: string | null) => void;
}


const useCurrentUser = create<CurrentUserState>((set) => ({
    email : null,
    setEmail : (newEmail: string | null) => set({email : newEmail})
}))

export default useCurrentUser;