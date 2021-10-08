import { useEffect, useState } from 'react';
import search from '../src/search.png';
import Country from './Country';
import geoFlag from '../src/geoFlag.svg';
import errorImg from '../src/errorImg.jpg';

function App() {
  
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [answer, setAnswer] = useState('');

  const [flag, setFlag] = useState(geoFlag);
  const [name, setName] = useState('Georgia');
  const [nativeName, setNativeName] = useState('საქართველო');
  const [language, setLanguage] = useState('Georgian');
  const [capital, setCapital] = useState('Tbilisi');
  const [subregion, setSubRegion] = useState('Western Asia');
  const [population, setPopulation] = useState('3,720,400');
  const [area, setArea] = useState('69,700 კმ²');
  const [currency, setCurrency] = useState('ლ Georgian Lari');

  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then(res => res.json())
      .then(
        (result) => {
          setItems(result);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      )
  }, []);
 
  let count = items.length;

  const numberWithCommas = (x) => {
   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const find = () => {
    for (let i = 0; i <= items.length; i++){
      let reg = new RegExp(items[i].name, 'i');
      let reg2 = new RegExp(items[i].nativeName, 'i');
        if(answer.match(reg) || answer.match(reg2)){
          return (
          setAnswer(''),
          setFlag(items[i].flag),
          setName(items[i].name),
          setNativeName(items[i].nativeName),
          setCapital(items[i].capital),
          setLanguage(items[i].languages[0].name),
          setSubRegion(items[i].subregion),
          setPopulation(numberWithCommas(items[i].population)),
          setArea(numberWithCommas(items[i].area) + ' კმ²'),
          setCurrency(items[i].currencies[0].symbol + ' ' + items[i].currencies[0].name)
          )
    } else if (!answer.match(reg)){
      count--;
      if(count <= 0){
        return (
          setAnswer(''),
          setFlag(errorImg),
          setName('---'),
          setNativeName('---'),
          setCapital('---'),
          setLanguage('---'),
          setSubRegion('---'),
          setPopulation('---'),
          setArea('---'),
          setCurrency('---')
        )
      }
    }
  }
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <h2>Loading...</h2>;
  } else {
    return (
    <div className='container'>
      <div className='inp'>
      <input value={answer} onChange={(e) => setAnswer(e.target.value)} type='text' placeholder='ქვეყნის დასახელება' autoFocus/>
      <img onClick={find} className='search' src={search} alt='logo' />
      </div>
      <div className='ff'>
      <img  className='flag' src={flag} alt='imgg' />
      </div>
        <Country
        name={name}
        nativeName={nativeName}
        capital={capital}
        language={language}
        subregion={subregion}
        population={population}
        area={area}
        currency={currency} 
        />
    </div>
  );
  }
}

export default App;


