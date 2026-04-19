import React from 'react'
import './Menu.css'
import { getAlignDirection } from '@/utils/functions'

type MenuPropsType = {
    children: React.ReactElement,
    width?: string,
    height?: string,
    bckColor?: string,
    flexDirection?: "row" | "column",
    alignContent?: "flex-start" | "center" | "flex-end",
    style?: React.CSSProperties
}


const Menu = ({children, width, height, bckColor, flexDirection = "row", alignContent = "flex-start", style} : MenuPropsType) => {

    const styles : React.CSSProperties = {
        width: width,
        height: height,
        backgroundColor: bckColor,
        flexDirection: flexDirection,
        ...style
    }

    const displayAlign = getAlignDirection(flexDirection, alignContent)

    return (
        <nav style={{...styles, ...displayAlign}} className='menu'>
            {children}
        </nav>
    )
}

export default Menu