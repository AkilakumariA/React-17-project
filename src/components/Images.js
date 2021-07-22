import React, { useState } from 'react';
import Image from './Image';
import useFetchImage from '../utils/hooks/useFetchImage';
import Loading from './Loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import useDebounce from '../utils/hooks/useDebounce';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';

export default function Images() {
    // const [myInterval, setmyInterval] = useState(null);
    // useEffect(() => {
    //     console.log('Images comp mounted');
    //     const interval = setInterval(() => {
    //         console.log('Hello');
    //     }, 1000);
    //     return () => {
    //         clearInterval(interval);
    //         console.log('Images comp unmounted');
    //     }
    // }, []);
    // const [images, setimages] = useState([]);
    const [page, setpage] = useState(1)
    const [searchTerm, setsearchTerm] = useState(null)
    const [images, setimages, errors, isLoading] = useFetchImage(page, searchTerm);
    // const scrollPosition = useScroll();
    // const [newImageUrl, setnewImageUrl] = useState('');
    const [showPreview, setShowPreview] = useState(false)
    // const inputRef = useRef(null);
    // const [MyName, setMyName] = useState('ReactJSX');

    // useEffect(() => {
    //     inputRef.current.focus();
    // }, []);

    // useLayoutEffect(() => {
    //     setMyName('React Js');
    // });
    // useEffect(() => {
    //     if (scrollPosition >= document.body.offsetHeight - window.innerHeight) {
    //         setpage(page + 1)
    //     }
    // }, [scrollPosition])


    //component inside component
    // function ShowImages() {
    //     return (

    //     );
    // }
    // function handleAdd() {
    //     // let tempImage = [...images];
    //     // tempImage.push('https://images.unsplash.com/photo-1472898965229-f9b06b9c9bbe?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80');
    //     // console.log(tempImage);
    //     // setimages(tempImage)
    //     // setimages([...images, 'https://images.unsplash.com/photo-1472898965229-f9b06b9c9bbe?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80']);
    //     // setimages(['https://images.unsplash.com/photo-1472898965229-f9b06b9c9bbe?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80', ...images]);
    //     if (newImageUrl !== '') {
    //         setimages([...images, newImageUrl]);
    //         setnewImageUrl('');
    //     }
    // }
    // function handleChange(event) {
    //     setnewImageUrl(event.target.value);
    // }
    function handleRemove(index) {
        // setimages(images.filter((image, i) => i !== index));
        setimages([...images.slice(0, index), ...images.slice(index + 1, images.length)])
    }
    // function handleMouseEnter() {
    //     setisHovering(true)
    // }
    // function handleMouseOut() {
    //     setisHovering(false)
    // }
    // if (isLoading)
    //     return <Loading />

    const debounce = useDebounce();
    function handleInput(e) {
        const text = e.target.value;
        debounce(() => setsearchTerm(text), 1000)

    }

    return (
        <section>
            {/* <p>My Name is {MyName}</p> */}
            {/* <p>{scrollPosition}</p> */}
            <div className='my-5'>
                <input placeholder='Search Photos Here' type='text' onChange={handleInput} className='w-full border rounded shadow p-2' />
            </div>
            {errors.length > 0 && (
                <div className='flex h-screen'>
                    <p className='m-auto'>{errors[0]}</p>
                </div>)}

            {/* <ShowImages /> */}

            <AnimateSharedLayout>
                <InfiniteScroll dataLength={images.length} next={() => { setpage(page + 1) }} hasMore={true} className='flex flex-wrap'>
                    {
                        images.map((img, index) => (
                            <motion.div className='w-1/6 p-1 border flex justify-center' key={index} layoutId={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Image show={() => setShowPreview(index)} image={img.urls.regular} handleRemove={handleRemove} index={index} /></motion.div>)
                        )
                    }
                </InfiniteScroll>
                <AnimatePresence >
                    {showPreview && (
                        <motion.section layoutId={showPreview} exit={{ opacity: 0, rotate: 360, transition: { duration: 1 } }} className='fixed w-full h-full flex justify-center items-center top-0 left-0 z-40' onClick={() => setShowPreview(false)} >
                            <div className='bg-white'>
                                <img src={images[showPreview].urls.regular} alt='nature' className='rounded-lg' width='300' height='auto' key={showPreview} />
                            </div>
                        </motion.section>)
                    }
                </AnimatePresence>
            </AnimateSharedLayout>

            {/* {errors.length === 0 && (<button onClick={() => setpage(page + 1)} >Load More</button>)} */}

            {/* <div className='flex justify-between my-2'>
                <div className='w-full'>
                    <input type='text' ref={inputRef} id='inputbox' className='w-full p-2 border border-gray-800 shadow rounded' onChange={handleChange} value={newImageUrl} />
                </div>
                <div>
                    <button disabled={newImageUrl === ''} className={`p-2 ml-2 text-white rounded ${newImageUrl !== '' ? 'bg-green-600' : 'bg-green-300'}`} onClick={handleAdd}>Add</button>
                </div>
            </div> */}
            {isLoading && <Loading />}

        </section>
    );
}

// export default class Images extends Component {
//     constructor(props) {
//         super(props);
//         this.state = { interval: null };
//     }
//     componentDidMount() {
//         console.log('Images comp mounted');
//         this.setState({
//             interval: setInterval(() => {
//                 console.log('Hello');
//             }, 1000)
//         });
//     }
//     componentWillUnmount() {
//         console.log('Images comp unmounted');
//         clearInterval(this.state.interval);
//     }
//     render() {
//         return (
//             <img src='https://images.unsplash.com/photo-1531608139434-1912ae0713cd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80' alt='bi-cycle' />
//         )
//     }
// }
