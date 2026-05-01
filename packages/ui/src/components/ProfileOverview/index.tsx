'use client'

import Budget from '../Budget';
import IconBtn from '../IconBtn';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { useState } from 'react';
import FrameImg from '../FrameImg';
import './ProfileOverview.scss'

type ProfileOverviewProps = {
  name: string;
  amount?: number;
}

export const ProfileOverview = ({ name, amount = 1000 }: ProfileOverviewProps) => {
  const [showBudget, setshowBudget] = useState(true)
  return (
    <FrameImg height={200} width={400} backgroundImage={'/profileBackground.png'} className="profile-overview">
      <h2>Olá, {name}</h2>
      <p>Saldo em Conta</p>
      <section className='budget-section'>
        <Budget amount={amount} isHidden={showBudget} />
        <IconBtn icon={showBudget ? IoEyeOff : IoEye} type='button' hasBackgroundColor={false} eventClick={() => setshowBudget(!showBudget)} style={{ fill: "white" }} />
      </section>
    </FrameImg>
  )
}
