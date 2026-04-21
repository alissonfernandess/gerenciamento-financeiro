type BudgetProps = {
    amount: number;
    isHidden?: boolean;
}
const Budget = ({ amount, isHidden=false }: BudgetProps) => {

  const displayAmount = isHidden ? '****' : `R$ ${amount.toFixed(2)}`;
  
  return (
    <span>
      {displayAmount}
    </span>
  )
}

export default Budget