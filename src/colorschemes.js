import {getItem, setItem} from './SaveDataManager'

const schemes = {
    
    'stoplight':[[0, 100.74, 27.65],[100, 100, 50]],
    'red':  [[372, 60.74, 7.65],[355.94, 90.44, 60.76]],
    'green':  [[148, 100, 4.71],[75, 100, 50]],
    'heatmap':[[262.35, 100, 30],[404.47, 100, 50]],
    'autumn':[[339.18, 80.33, 11.96],[403.24, 100, 51.57]],
}

let currentScheme = null
const getCurrentScheme = () => {
    if (currentScheme == null) {
        const savedScheme = getItem('colorscheme')
        if (savedScheme) {
            currentScheme = schemes[savedScheme]
        } else {
            currentScheme = schemes['stoplight']
            setItem('colorscheme','stoplight')
        }
    }
    return currentScheme
}
const setCurrentScheme = (newSchemeName) => {
    const newScheme = schemes[newSchemeName]
    if (newScheme) {
        currentScheme = newScheme
        setItem('colorscheme',newSchemeName)
    }
}

export {getCurrentScheme, setCurrentScheme, schemes}