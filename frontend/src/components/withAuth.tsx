import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useDispatch, useSelector} from "react-redux";
import {selectAuthState} from "@/redux/reducers/AuthReducer";
import {showError} from "@/redux/reducers/ErrorReducer";

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P> => {
    const AuthWrapper: React.FC<P> = (props: P) => {
        const router = useRouter();
        const isAuthenticated = useSelector(selectAuthState);
        const dispatch = useDispatch();

        useEffect(() => {
            if (!isAuthenticated) {
                dispatch(showError('You need to be logged in to access this page'))
                router.push({
                    pathname: '/login',
                }).then(r => console.log(r));
            }
        }, [dispatch, isAuthenticated, router]);

        return isAuthenticated ? <WrappedComponent {...props} /> : null;
    };

    return AuthWrapper;
};

export default withAuth;