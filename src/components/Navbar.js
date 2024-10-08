import React, { useState } from 'react';
import Style from './Navbar.module.scss';
import Toggler from "./home/Toggler";
import { useLocation } from "react-router-dom";
import { HashLink as Link } from 'react-router-hash-link';
import { Box } from "@mui/material";
import { info } from "../info/Info";
import { singlePage } from '../info/Info';

const links = [
    {
        name: 'Accueil',
        to: '',
        active: 'home'
    },
    {
        name: 'En savoir plus ',
        to: 'about',
        active: 'about'
    },
    {
        name: info.initials,
        type: 'initials',
        to: '',
        active: 'home'
    },
    {
        name: 'Portfolio',
        to: 'portfolio',
        active: 'portfolio'
    }
]

// This function is used to create a scroll offset to compensate for the navbar
// when you click on the nav buttons to scroll down.
const scrollWidthOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80; 
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
}
/*La fonction scrollWidthOffset :

Calcule la position verticale de l'élément el dans le document par rapport au haut de la fenêtre d'affichage, en tenant compte du défilement actuel de la page.
Applique un décalage vertical (yOffset) pour ajuster la position finale de défilement. Ici, le décalage est de 80 pixels vers le haut.
Fait défiler la page en douceur jusqu'à la position calculée, en utilisant window.scrollTo avec le paramètre behavior: 'smooth' pour une transition fluide.
Cette fonction est utile pour créer une expérience utilisateur plus fluide et précise lorsque tu souhaites faire défiler la page vers un élément spécifique, tout en tenant compte de tout espace supplémentaire (comme une barre de navigation fixe) qui pourrait couvrir l'élément ciblé.*/

export default function Navbar({ darkMode, handleClick, active, setActive }) {

    return (
        <Box component={'nav'} width={'100%'} position={singlePage ? 'fixed' : 'relative'} className={darkMode? Style.dark : Style.light}>
            <Box component={'ul'} display={'flex'} justifyContent={'center'} alignItems={'center'}
                gap={{ xs: '2rem', md: '8rem' }}
                textTransform={'lowercase'} fontSize={'1rem'}>
                {links.map((link, index) => (
                    <Box key={index} component={'li'} className={(link.active === active && !link.type) && Style.active}
                        sx={{ borderImageSource: info.gradient }}>
                        <Link to={singlePage ? `#${link.to}` : `/${link.to}`}
                        scroll={el => scrollWidthOffset(el)}
                            smooth
                            onClick={() => setActive(link.active)} className={Style.link}>
                            {!link.type && <p style={{ padding: '0.5rem 0' }}>{link.name}</p>}
                            {link.type && <h1>{link.name}</h1>}
                        </Link>
                    </Box>
                ))}
                <li>
                    <Toggler darkMode={darkMode} handleClick={handleClick} />
                </li>
            </Box>
        </Box>
    )
}