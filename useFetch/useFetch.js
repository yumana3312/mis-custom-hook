import { useEffect, useState, useRef } from "react"


export const useFetch = ( url ) => {

    const isMounted = useRef(true);//*

    const [state, setState] = useState({ data: null, loading: true, error: null });

    useEffect( () => {//*

        return () => {
            isMounted.current = false;
        }

    }, []);

    useEffect( () => {

        setState({ data: null, loading: true, error: null });
    
        fetch( url )
            .then( resp => resp.json() )
            .then( data => {

                //setTimeout( () => {//*Asi finjimos un retraso en la peticion

                    if( isMounted.current ) {//*
                        setState({
                            loading: false,
                            error: null,
                            data 
                        })
                    }/* else {//*Esto se ejecutaria si se desmonta el componente antes de resolver la peticion
                        console.log('setState no se llamo');
                    }

                }, 4000 );*/

            });

    }, [url])

    return state;

}
