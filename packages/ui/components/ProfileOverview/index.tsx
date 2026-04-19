'use client'

import Budget from '../Budget';
import IconBtn from '../IconBtn';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import './ProfileOverview.css'
import { useState } from 'react';
import FrameImg from '../FrameImg';


type ProfileOverviewProps = {
    name: string;
}

const ProfileOverview = ({ name }: ProfileOverviewProps) => {
    const [showBudget, setshowBudget] = useState(true)
  return (
    <FrameImg height={200} width={400}>
        <h2>Olá, {name}</h2>
        <section className='budget-section'>
            <Budget amount={1000} isHidden={showBudget} />
            <IconBtn icon={showBudget ? IoEye : IoEyeOff} type='button' backgroundColor='transparent' fontColor='white' eventClick={() => setshowBudget(!showBudget)} />
        </section>
    </FrameImg>
  )
}

export default ProfileOverview