export default function BasketEmpty() : JSX.Element{
  return (
    <div>
      <p className='basket-item__title' data-testid='basket-empty'>Корзина пуста. Пожалуйста добавьте товар в корзину.</p>
    </div>
  );
}
