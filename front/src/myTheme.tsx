import { Admin, defaultTheme } from 'react-admin';

const myTheme = {
    ...defaultTheme,
    palette: {
        ...defaultTheme.palette,
        primary: {
            main: '#04953f',
        },
        secondary: {
            main: '#04953f',
        },
    },
}

export default myTheme;