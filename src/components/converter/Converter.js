import React, {useState} from 'react';
import Select from 'react-select';
import {HiSwitchHorizontal} from 'react-icons/hi';
import {useQuery} from 'react-query';
import CurrencyApiService from '../../services/CurrencyApiService';
import './Converter.scss';
import currencyApiService from '../../services/CurrencyApiService';
import AuthService from '../../services/AuthService';
import authService from "../../services/AuthService";

const Converter = () => {

    const [from, setFrom] = useState(AuthService.getCurrentUser() ? AuthService.getCurrentUser().baseCurrency : 'usd');
    const [to, setTo] = useState('rub');
    const [amount, setAmount] = useState(0);
    const [ratios, setRatios] = useState([]);
    const [names, setNames] = useState([]);
    const [converted, setConverted] = useState(0);

    useQuery(`currenciesDescriptions`, CurrencyApiService.fetchNames,
        {
            staleTime: 10000,
            onSuccess: (res) => {
                setNames(res);
            }
        }
    );

    const fetchRatios = () => {
        return currencyApiService.fetchRatios(from);
    }

    const {error, status, refetch} = useQuery(`ratios-from-${from}`, fetchRatios,
        {
            refetchOnWindowFocus: false,
            onSuccess: (res) => {
                setConverted(amount * res[from][to]);
                setRatios(res[from]);
            }
        }
    );
    const getOptions = () => {
        if (typeof ratios === 'undefined' || ratios === null) {
            return [];
        }
        return Object.keys(ratios).map((item) => {
            return {
                value: item,
                label: item
            }
        });
    }

    const flip = () => {
        const temp = from;
        setFrom(to);
        setTo(temp);
        refetch();
    }

    return (
        <div className='converter'>
            {status === 'error' && <p>{error}</p>}
            {status === 'success' && (
                <>
                    <div className='converter-form'>
                        <div className='converter-form__amount'>
                            <h3>Amount</h3>
                            <input type='number'
                                   className='converter-form__input'
                                   placeholder='Enter the amount'
                                   value={amount}
                                   onChange={(e) => {
                                       if (e.target.value.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) {
                                           setAmount(e.target.value);
                                           refetch();
                                       }
                                   }}/>
                        </div>
                        <div className='converter-form__from' title={names[from]}>
                            <h3>From</h3>
                            <Select options={getOptions()}
                                    isSearchable={true}
                                    onChange={(e) => {
                                        setFrom(e.value);
                                        refetch();
                                    }}
                                    value={from.value} placeholder={from}/>
                        </div>
                        <div className='converter-form__switch'>
                            <HiSwitchHorizontal size='30px' onClick={() => {
                                flip()
                            }}/>
                        </div>
                        <div className='converter-form__to' title={names[to]}>
                            <h3>To</h3>
                            <Select options={getOptions()}
                                    isSearchable={true}
                                    title={names[to]}
                                    onChange={(e) => {
                                        setTo(e.value);
                                        refetch();
                                    }}
                                    value={to.value} placeholder={to}/>
                        </div>
                    </div>
                    <div className='converter__result'>
                        <p>{amount + ' ' + from + ' = ' + converted.toFixed(2) + ' ' + to}</p>
                    </div>
                    {AuthService.getCurrentUser() && (
                        <div className='converter__ratio-table'>
                            <table className='table'>
                                <thead>
                                <tr>
                                    <th>
                                        Code
                                    </th>
                                    <th>
                                        value for {amount} {from}
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {Object.keys(ratios).map((currencyCode) => {
                                    return (
                                        <tr key={currencyCode}>
                                            <td title={names[currencyCode]}>
                                                {currencyCode}
                                            </td>
                                            <td>
                                                {(amount * parseFloat(ratios[currencyCode])).toFixed(2)}
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {!AuthService.getCurrentUser() && (
                        <div className='converter__empty'>
                            <h3>Log in or create an account to see full convertions list and more</h3>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Converter;