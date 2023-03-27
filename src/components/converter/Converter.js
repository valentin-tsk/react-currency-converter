import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import {HiSwitchHorizontal} from 'react-icons/hi';
import {useQuery} from 'react-query';
import './Converter.scss';

const Converter = () => {
    const [apiUrl] = useState('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies');
    const [from, setFrom] = useState('usd');
    const [to, setTo] = useState('rub');
    const [amount, setAmount] = useState(0);
    const [ratios, setRatios] = useState([]);
    const [names, setNames] = useState([]);
    const [converted, setConverted] = useState(0);

    const fetchRatios = async () => {
        const res = await fetch(`${apiUrl}/${from}.json`);
        return res.json();
    };

    const fetchNames = async () => {
        const res = await fetch(`${apiUrl}.json`);
        return res.json();
    };

    useQuery(`currenciesDescriptions`, fetchNames,
        {
            staleTime: 10000,
            onSuccess: (res) => {
                setNames(res);
            }
        }
    );

    const {error, status, refetch} = useQuery(`${apiUrl}/${from}`, fetchRatios,
        {
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
        <div className="converter">
            {status === "error" && <p>{error}</p>}
            {status === "success" && (
                <>
                    <div className="converter-form">
                        <div className="converter-form__amount">
                            <h3>Amount</h3>
                            <input type="number"
                                   className="converter-form__input"
                                   placeholder="Enter the amount"
                                   value={amount}
                                   onChange={(e) => {
                                       if (e.target.value.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) {
                                           setAmount(e.target.value);
                                           refetch();
                                       }
                                   }}/>
                        </div>
                        <div className="converter-form__from" title={names[from]}>
                            <h3>From</h3>
                            <Select options={getOptions()}
                                    isSearchable={true}
                                    onChange={(e) => {
                                        setFrom(e.value);
                                        refetch();
                                    }}
                                    value={from.value} placeholder={from}/>
                        </div>
                        <div className="converter-form__switch">
                            <HiSwitchHorizontal size="30px" onClick={() => {
                                flip()
                            }}/>
                        </div>
                        <div className="converter-form__to" title={names[to]}>
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
                    <div className="converter__result">
                        <p>{amount + " " + from + " = " + converted.toFixed(2) + " " + to}</p>
                    </div>
                    <div className="converter__ratio-table">
                        <table className="table">
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
                                        <td>
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
                </>
            )}
        </div>
    );
}

export default Converter;