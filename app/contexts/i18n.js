"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { fetchAllLanguages, fetchTranslations } from "../helpers/backend";
import { useFetch } from "../helpers/hooks";

const I18nContext = createContext({});

const I18nProvider = ({ children }) => {
    const [languages] = useFetch(fetchAllLanguages)
    const [translations, setTranslations] = useState({})
    const [lang, setLang] = useState()
    const [direction, setDirection] = useState('ltr')

    useEffect(() => {
        const lang = localStorage.getItem('lang')
        if (!!lang) {
            const selectedLang = languages?.find(l => l?._id === lang)
            setDirection(selectedLang?.rtl ? 'rtl' : 'ltr')
            setLang(lang)
            fetchTranslations({ _id: lang }).then(({ success, data }) => {
                if (success) {

                    setTranslations(data?.translations)
                }
            })
        }
    }, [lang])

    const changeLanguage = (value) => {
        const lang = languages?.find(l => l?._id === value)
        if (lang) {
            setLang(value)
            setDirection(lang?.rtl ? 'rtl' : 'ltr')
            localStorage.setItem('lang', value)
        }

        // window.location.reload()
    }



    useEffect(() => {
        if (languages?.length > 0) {
            languages?.forEach(lang => {
                if (!!lang?.default) {
                    setLang(lang?._id)
                }
                // setDirection(lang?.rtl ? 'rtl' : 'ltr')
            })
        }
    }, [languages])

    useEffect(() => {
        document.documentElement.dir = direction
    }, [direction])


    // const t = (key) => translations?.[key] || key

    const t = (key) => {
        console.log({key});
        if (!!key && languages?.length > 0) {
            let langKeys = localStorage.getItem('lang_keys')
            let data = !!langKeys ? JSON.parse(langKeys) : {}
            data[key] = ''
            localStorage.setItem('lang_keys', JSON.stringify(data))
        }
        return translations ? translations?.[key] : key;
    }

    return (
        <I18nContext.Provider value={{ languages, lang, setLang, t, changeLanguage, direction }}>
            {children}
        </I18nContext.Provider>
    )
}

export default I18nProvider
export const useI18n = () => useContext(I18nContext)