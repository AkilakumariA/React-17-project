import React, { useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import './assets/css/style.css';
import Header from './components/Header';
import routes from './utils/routes/Index';
import firebase from './congif/firebase';
import AppContext from './store/AppContext';
import AuthRoute from './utils/routes/AuthRoute';
import GuestRoute from './utils/routes/GuestRoute';
import Loading from './components/Loading';
import NotFound from './page/404';
import { AnimatePresence } from 'framer-motion';
import AnimatedRoute from './utils/routes/AnimatedRoute';


function App() {
    // const [title, settitle] = useState("Hello React");
    // const [isShowing, setisShowing] = useState(false);
    // const mountRef = useRef(false);

    // function handleClick() {
    //     setisShowing(!isShowing)
    // }
    // //component did mount
    // useEffect(() => {
    //     console.log('App Mounted');
    // }, []);
    // //component will update
    // useEffect(() => {
    //     mountRef.current = mountRef.current ? (console.log('App Updated')) : true;
    // }, [isShowing])

    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [user, setuser] = useState({});
    const [isLoading, setisLoading] = useState(false)


    useEffect(() => {
        setisLoading(true);
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setisLoggedIn(true);
                setuser(user);
                setisLoading(false);
            } else {
                setuser({});
                setisLoggedIn(false);
                setisLoading(false);
            }
        })
    }, []);
    const location = useLocation();

    if (isLoading) return <Loading />;

    return (
        // <Router>
        <AppContext.Provider value={[isLoggedIn, user]}>
            <Header />
            <AnimatePresence exitBeforeEnter initial={false}>
                <Switch key={location.pathname} location={location}>
                    {routes.map((route, index) => {
                        if (route.protected === 'guest') {
                            return (
                                <GuestRoute key={route.path} path={route.path} exact={route.exact}>
                                    <route.component />
                                </GuestRoute>
                            );
                        }
                        if (route.protected === 'auth') {
                            return (
                                <AuthRoute key={route.path} path={route.path} exact={route.exact}>
                                    <route.component />
                                </AuthRoute>
                            );
                        }

                        return (
                            <AnimatedRoute key={route.path} path={route.path} exact={route.exact}>
                                <route.component />
                            </AnimatedRoute>
                        );

                    })}
                    <Route path='*'>
                        <NotFound />
                    </Route>
                </Switch>
            </AnimatePresence>
        </AppContext.Provider>
        // </Router >
    );
}

// class App extends Component {
//     constructor(props) {
//         console.log('App Constructor');
//         super(props);
//         this.state = {'title': 'Hello React', isShowing: false };
//         this.handleClick = this.handleClick.bind(this);
//     }
//     //states are immutable
//     // handleClick = () => {this.setState({ isShowing: !this.state.isShowing })}
//     componentDidMount() {
//         console.log('App mounted');
//         this.setState({title: 'Hi newly updated React' });
//     }

//     componentDidUpdate() {console.log('App Updated'); }
//     handleClick() {
//         this.setState({isShowing: !this.state.isShowing });
//     }
//     render() {
//         console.log('App Render');
//         return (
//             <section className='flex justify-center text-center'>
//                 <div className='w-1/2'>
//                     <div className='my-4'>{this.state.title}</div>
//                     <div>
//                         <button onClick={this.handleClick} className='my-2 p-1 bg-blue-700 text-white'>Toggle image</button>
//                     </div>
//                     {this.state.isShowing ? <Images /> : null}
//                 </div>
//             </section>
//         );
//     }
// }


export default App;