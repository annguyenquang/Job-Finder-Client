import { create } from "zustand"


type ApplicationDialogStore = {
    isOpen: boolean,
    cvFile: File | null,
    phoneNumber: string | null,
    hasCoverLetter: boolean,
    coverLetter: string | null,
    setIsOpen: (isOpen: boolean) => void;
    setCvFile: (file: File | null) => void,
    setPhoneNumber: (newPhone: string) => void,
    setHasCoverLetter: (newValue: boolean) => void,
    sendApplication: () => Promise<void>
    setCoverLetter: (newValue: string) => void;
};

export const useApplicationDialogStore = create<ApplicationDialogStore>()((set) => ({
    isOpen: false,
    cvFile: null,
    phoneNumber: null,
    hasCoverLetter: false,
    coverLetter: null,
    setIsOpen: (isOpen: boolean) => {
        set(() => ({ isOpen: isOpen }))
    },
    setCvFile: (file:File | null) => {
        set(() => ({ cvFile: file }))
    },
    setPhoneNumber: (newPhone: string) => {
        set(() => ({ phoneNumber: newPhone }))
    },
    setHasCoverLetter: (newValue: boolean) => {
        set(() => ({ hasCoverLetter: newValue }))
    },
    setCoverLetter: (newValue) => {
        set(() => ({ coverLetter: newValue }))
    },
    sendApplication: () => {
        throw Error;
    }
}));