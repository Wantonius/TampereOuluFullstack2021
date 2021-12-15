import React,{useState} from 'react';
import LocaleContext,{localizations} from './LocaleContext';

const LocaleProvider = (props) => {
	
	const [locale,setLocale] = useState({
		locale:localizations.en
	})
	
	const changeLocale = (locale) => {
		if(locale === "en") {
			setLocale({
				locale:localizations.en
			})
		}
		if(locale === "fi") {
			setLocale({
				locale:localizations.fi
			})
		}
	}
	return(
		<LocaleContext.Provider value={{
			strings:locale.locale,
			changeLocale:changeLocale
		}}>
		{props.children}
		</LocaleContext.Provider>
	)
}

export default LocaleProvider;