import { Admin, defaultTheme } from 'react-admin';

const myTheme = {
    ...defaultTheme,
    palette: {
        ...defaultTheme.palette,
        primary: {
            main: '#c22032',
        },
        secondary: {
            main: '#c22032',
        },
    },
}

export default myTheme;