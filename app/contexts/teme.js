// 'use client'
// import React, { createContext, useEffect, useState } from 'react';
// export const ThemeContext = createContext();

// const Theme = ({ children }) => {
//     const [darkMode, setDarkMode] = useState(false);
//     // theme color start

//     useEffect(() => {
//         const savedMode = localStorage.getItem('darkMode')
//         if (!savedMode) {
//             setDarkMode(JSON.parse(savedMode))
//         }

//     }, [])



//     useEffect(() => {
//         localStorage.setItem('darkMode', JSON.stringify(darkMode));
//         const savestore = document.documentElement.classList.toggle('dark', darkMode);
//         setDarkMode(savestore);
//     }, [darkMode]);

//     const toggleDarkMode = () => {
//         setDarkMode(prevMode => !prevMode);
//     };

//     return (
//         <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
//             <div className='bg-green-600'>
//                 {children}
//             </div>
//         </ThemeContext.Provider>
//     );
// };

// export default Theme;