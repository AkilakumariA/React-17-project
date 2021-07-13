import axios from 'axios';
import { useEffect, useState } from 'react';

const api = process.env.REACT_APP_UNSPLASH_API;
const secret = process.env.REACT_APP_UNSPLASH_KEY;
export default function useFetchImage(page, searchTerm) {
    const [Images, setImages] = useState([]);
    const [errors, setErrors] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    function fetch() {
        const url = (searchTerm === null) ? 'photos?' : `search/photos?query=${searchTerm}&`
        axios.get(`${api}/${url}client_id=${secret}&page=${page}`).then(res => {
            searchTerm === null ? fetchRandom(res) : fetchSearch(res);
            setisLoading(false);
        }).catch((e) => {
            setErrors(["Unable to fetch images"]);
            setisLoading(false);
        });
    }
    function fetchSearch(res) {
        page > 1 ? setImages([...Image, ...res.data.results]) : setImages([...res.data.results]);

    }
    function fetchRandom(res) {
        setImages([...Images, ...res.data]);
    }

    useEffect(() => {
        setisLoading(true);

        // const url = searchTerm === null ? 'photos' : 'search/photos';
        // axios.get(`${api}/${url}?client_id=${secret}&page=${page}&query=${searchTerm}`)
        fetch();
    }, [page, searchTerm]);
    // useEffect(() => {
    //     if (searchTerm === null) return;
    //     setisLoading(true);
    //     fetch();
    // }, [searchTerm])

    return [Images, setImages, errors, isLoading];
}
