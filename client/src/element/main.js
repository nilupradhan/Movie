import react, {useEffect, useState} from 'react';
import Card from './card';

let API_key ="api_key=296bbfd491d9817c4cfc70f6b153cc77";
let base_url = "https://api.themoviedb.org/3";
let url = base_url+"/discover/movie?"+API_key;
let arr = ["Popular","Upcoming","Now Playing","Top Rated"];

const Main = ()=>{
    const [movieData,setData] = useState([]);
    const [url_set,setUrl] = useState(url);
    const [search,setSearch] = useState()

    useEffect(()=>{
        fetch(url_set).then(res => res.json()).then(data => {
            // console.log(data.results);
            setData(data.results);
        });
    },[url_set])

    const getData=(movieType)=>{
        if(movieType==="Popular")
        {
            url = base_url+"/movie/popular?"+API_key; 
        }
        if(movieType==="Upcoming")
        {
            url = base_url + "/movie/upcoming?" + API_key;
        }
        if(movieType==="Now Playing")
        {
            url = base_url + "/movie/now_playing?" + API_key;
        }
        if(movieType==="Top Rated")
        {
            url = base_url + "/movie/top_rated?" + API_key;
        }
        setUrl(url);
    }

    const searchMovie=(event)=>{
        if(event.key=="Enter")
        {
            url = base_url + "/search/movie?api_key=296bbfd491d9817c4cfc70f6b153cc77&query=" + search;
            setUrl(url);
            setSearch(" ");
        }
    }

    return(
        <>
             <div className="header">
                <nav>
                    <ul>
                        {
                            arr.map((value)=>{
                                return(
                                    <li><a href="#" name={value} onClick={(e)=>{getData(e.target.name)}}>{value}</a></li>
                                )
                            })
                        }
                    </ul>
                </nav>
                <form>
                    <div className="search-btn">
                        <input type="text" placeholder='Enter A Movie Name' className='inputText' onChange={(e)=>{setSearch(e.target.value)}} value={search} onKeyUp={searchMovie} />
                        <button><i className="fas fa-search"></i></button>
                    </div>
                </form>
             </div>
             <div className='container'>
                {
                    (movieData.length==0)?<p className='notfound'>Not Found</p>:movieData.map((res,pos)=>{
                        return(
                            <Card info={res} key={pos} />
                        )
                    })
                }
             </div>
        </>
    )
}
export default Main;