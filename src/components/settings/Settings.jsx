import React, {useState} from 'react';
import Select from 'react-select';
import {useQuery} from 'react-query';
import CurrencyApiService from '../../services/CurrencyApiService';
import './Settings.scss';
import AuthService from '../../services/AuthService';

const Settings = () => {

    const [from, setFrom] = useState('usd');
    const [names, setNames] = useState([]);
    const [responseError, setResponseError] = useState('');

    const updateUserCurrency = (fromCurrency) => {
        const userData = AuthService.getCurrentUser();
        userData.baseCurrency = fromCurrency;
        delete userData.password;
        AuthService.updateUserInfo(userData).then((response) => {
            return response.json();
        }).then(function (data) {
            if (typeof data !== 'object') {
                setResponseError(data);
            } else {
                AuthService.setUserData(data);
                setFrom(data.baseCurrency);
            }
        }).catch(err => {
            setResponseError(err)
        });
    }

    const descriptionsQuery = useQuery(`currenciesDescriptions`, CurrencyApiService.fetchNames,
        {
            staleTime: 10000,
            onSuccess: (res) => {
                setNames(res);
            }
        }
    );

    const fetchUserInfo = async () => {
        return AuthService.getUserInfo(AuthService.getCurrentUser().id);
    }

    const userQuery = useQuery(['user-info'], fetchUserInfo,
        {
            staleTime: 10000,
            onSuccess: (res) => {
                setFrom(res.baseCurrency);
            }
        }
    );

    return (
        <div className='settings'>
            {userQuery.status === 'error' && <p>{userQuery.error.message}</p>}
            {userQuery.status === 'success' && (
                <>
                    {AuthService.getCurrentUser() && (
                        <div className='settings-form' title={names[from]}>
                            <h3>Basic from currency</h3>
                            <Select options={
                                Object.keys(names).map((item) => {
                                    return {
                                        value: item,
                                        label: item
                                    }
                                })
                            }
                                    className='settings-form__select'
                                    isSearchable={true}
                                    onChange={(e) => {
                                        setFrom(e.value);
                                        updateUserCurrency(e.value);
                                    }}
                                    value={from.value} placeholder={from}/>
                            <p className='error'>{responseError}</p>
                        </div>
                    )}
                    {!AuthService.getCurrentUser() && (
                        <div className='settins__empty'>
                            <h3>Log in to edit settings</h3>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Settings;