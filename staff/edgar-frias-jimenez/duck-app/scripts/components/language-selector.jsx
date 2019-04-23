const LanguageSelector = (() => {
    const literals = {
        english: 'English',
        spanish: 'Español',
        catalan: 'Català',
        galician: 'Galego'
    }

    return function ({ onLanguageChange }) {
        const { english, spanish, catalan, galician } = literals

        return (
            <select onChange={ e => onLanguageChange(e.target.value)}>
                <option value="en">{english}</option>
                <option value="es">{spanish}</option>
                <option value="ca">{catalan}</option>
                <option value="ga">{galician}</option>
            </select>
        )
    }

})()
