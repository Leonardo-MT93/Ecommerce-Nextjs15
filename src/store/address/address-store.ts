import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface State {
    address: {
        name: string;
        lastName: string;
        address: string;
        address2?: string;
        postalCode: string;
        city: string;
        country: string;
        phone: string;
    }
    setAddress: (address: State['address']) => void;
    clearAddress: () => void;
}

export const useAddressStore = create<State>()(
    persist(
        (set) => ({
            address: {
                name: '',
                lastName: '',
                address: '',
                postalCode: '',
                city: '',
                country: '',
                phone: '',
            },
            setAddress: (address: State['address']) => set({ address }),
            clearAddress: () => set({
                address: {
                    name: '',
                    lastName: '',
                    address: '',
                    postalCode: '',
                    city: '',
                    country: '',
                    phone: '',
                }
            })
        }),
        {
            name: 'address',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)