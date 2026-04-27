import { formatCurrency } from '../../../utils/functions';
import './Budget.scss';

type BudgetProps = {
    amount: number;
    isHidden?: boolean;
}

// Componente que exibi o valor do orçamento com opção de ocultação, substituindo o valor por asteriscos
const Budget = ({ amount, isHidden=false }: BudgetProps) => {

  const displayAmount = isHidden ? '****' : `R$ ${formatCurrency(amount)}`;
  
  return (
    <span className='Budget'>
      {displayAmount}
    </span>
  )
}

export default Budget