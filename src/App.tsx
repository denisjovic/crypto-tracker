import { useState, useEffect } from "react";
//@ts-ignore
import Footer from "./components/footer/Footer.component.tsx";
//@ts-ignore
import Coin from "./components/coin/Coin.component.tsx";

export interface CoinProps {
  coin: {
            key: string,
            coinName: string,
            img: string,
            volume: number,
            symbol: string,
            market: number,
            price: number
            priceChange: number
  }
}

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(true);
  const [errText, setErrText] = useState("");

  const err =
    "Something went wrong, please try again or check your internet connection.";
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=25&page=1&sparkline=false";

  const getData = async () => {
    try {
      let response = await fetch(url);
      let data = await response.json();
      setCoins(data);
      setLoader(false);
      setErrText("");
    } catch (error) {
      setLoader(false);
      setErrText(err);
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  const filterCoins = coins.filter((coin:any) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );


  const renderCoin = (): JSX.Element[] => filterCoins.map((coin:any) => {
    return <Coin
      key={coin.id}
      coinName={coin.name}
      img={coin.image}
      volume={coin.total_volume}
      symbol={coin.symbol}
      market={coin.market_cap}
      price={coin.current_price}
      priceChange={coin.price_change_percentage_24h} />;

  })

  return (
    <div className='coin-app'>
      <div className='coin-search'>
        <h1 className='coin-text'>Crypto Tracker</h1>
        <form>
          <input
            type='text'
            placeholder='Search...  &#128270;'
            className='coin-input'
            onChange={handleChange}
          />
        </form>
      </div>
      {loader && <div className='loader'></div>}
      {err && errText}
      {filterCoins.length ? renderCoin() : <h2>Currency does not exist, please try again.</h2>}
      <Footer />
    </div>
  );
}

export default App;

// TODO: add light vs dark theme toggle switch
