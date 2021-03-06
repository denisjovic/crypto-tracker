import React from 'react';
import './Coin.styles.scss';
import { CoinProps } from '../../App';


const Coin: React.FC<CoinProps['coin']> = ({
  img,
  coinName,
  symbol,
  price,
  volume,
  priceChange,
  market,
}) => {
  return (
    <div className='coin-container'>
      <div className='coin-row'>
        <div className='coin'>
          <img src={img} alt='crypto logo' />
          <h1>{coinName}</h1>
          <p className='coin-symbol'>{symbol}</p>
        </div>
        <div className='coin-data'>
          <p className='coin-price'>${price.toLocaleString()}</p>
          <p className='coin-volume'>${volume.toLocaleString()}</p>
          {priceChange < 0 ? (
            <p className='coin-percent red'>{priceChange.toFixed(2)}%</p>
          ) : (
            <p className='coin-percent green'>+{priceChange.toFixed(2)}%</p>
          )}
          <p className='coin-marketcap'>mkt cap: ${market.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Coin;
