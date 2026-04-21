'use client'

import IconBtn from '../IconBtn';
import { IoIosArrowDroprightCircle } from "react-icons/io";

import './HomeFrame.css'

type HomeFrameProps = {
    name: string
}

export default function HomeFrame({ name }: HomeFrameProps) {
  return (
    <div className='homeframe'>
        <h1>Bem-vindo {name}</h1>
        <section className='btn-section'>
            <IconBtn icon={IoIosArrowDroprightCircle} type='button' backgroundColor='transparent' fontColor='#172737' iconSize={81} />
            <span>Continuar</span>
        </section>
    </div>
  );
}