import {create } from 'zustand'


const useStore = create((Set) => ({
    user:null,
    setUser: (user) => Set((state) => ({...state, user})),
}))