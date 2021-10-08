
const Country = (props) => {
    const {name,nativeName,language,capital,
           subregion,population,area,currency} = props;
           
    return (
        <div className='fields'>
        <div>ქვეყნის დასახელება: {name}</div>
        <div>მშობლიური დასახელება: {nativeName}</div>
        <div>დედაქალაქი: {capital}</div>
        <div>მშობლიური ენა: {language}</div>
        <div>კონტინენტი: {subregion}</div>
        <div>მოსახლეობა: {population}</div>
        <div>ფართობი: {area}</div>
        <div>ვალუტა: {currency}</div>
        </div>
    )
}

export default Country;

