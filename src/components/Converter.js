import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import Select from 'react-select';
import {HiSwitchHorizontal} from 'react-icons/hi';
import './Converter.css';

const Converter = () => {
    const [apiUrl] = useState('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies')
    const [currencies, setCurrencies] = useState([]);

    const [from, setFrom] = useState('usd');
    const [to, setTo] = useState('rub');

    const [amount, setAmount] = useState(0);
    const [options, setOptions] = useState([]);
    const [output, setOutput] = useState(0);

    useEffect(() => {
        Axios.get(
            `${apiUrl}/${from}.json`)
            .then((res) => {
                setCurrencies(res.data[from]);
            })
    }, [from, to]);

    // Calling convert when user switches the currency
    useEffect(() => {
        setOptions(Object.keys(currencies).map((item) => {
            return {
                value: item,
                label: item
            }
        }));
        convert();
    }, [currencies, amount])

    // Function to convert the currency
    function convert() {
        var rate = currencies[to];
        setOutput(amount * rate);
    }

// Function to switch between two currency
    function flip() {
        var temp = from;
        setFrom(to);
        setTo(temp);
    }

    return (
        <>
            <div className="container">
                <div className="left">
                    <h3>Amount</h3>
                    <input type="text"
                           placeholder="Enter the amount"
                           onChange={(e) => {
                               setAmount(e.target.value);
                           }}/>
                </div>
                <div className="middle">
                    <h3>From</h3>
                    <Select options={options}
                            isSearchable={true}
                            onChange={(e) => {
                                setFrom(e.value)
                            }}
                            value={from.value} placeholder="From"/>
                </div>
                <div className="switch">
                    <HiSwitchHorizontal size="30px"
                                        onClick={() => {
                                            flip()
                                        }}/>
                </div>
                <div className="right">
                    <h3>To</h3>
                    <Select options={options}
                            isSearchable={true}
                            onChange={(e) => {
                                setTo(e.value)
                            }}
                            value={to.value} placeholder="To"/>
                </div>
            </div>
            <div className="result">
                <p>{amount + " " + from + " = " + output.toFixed(2) + " " + to}</p>
            </div>
        </>
    )
};

export default Converter;