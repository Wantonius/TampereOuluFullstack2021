import React from 'react';

export const localizations = {
	en:{
		type:"Type",
		count:"Count",
		price:"Price",
		add:"Add",
		remove:"Remove"
	},
	fi:{
		type:"Esine",
		count:"Määrä",
		price:"Hinta",
		add:"Lisää",
		remove:"Poista"
	}
}

const LocaleContext = React.createContext(localizations.en)

export default LocaleContext;