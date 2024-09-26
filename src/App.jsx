import { useState } from 'react';
import InputBox from './InputBox';
import useCurrencyInfo from './hooks/useCurrencyInfo';

function App() {
    const [amount, setAmount] = useState(0);
    const [from, setFrom] = useState('usd');
    const [to, setTo] = useState('inr');
    const [convertedAmount, setConvertedAmount] = useState(0);

    const currencyInfo = useCurrencyInfo(from);

    const options = Object.keys(currencyInfo);

    const swap = () => {
        setFrom(to);
        setTo(from);
        setConvertedAmount(amount);
        setAmount(convertedAmount);
    };

    const convert = () => {
        setConvertedAmount(amount * currencyInfo[to]);
    };

    return (
        <div
            className="w-full h-screen flex items-center justify-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url('https://plus.unsplash.com/premium_photo-1664476845274-27c2dabdd7f0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3RvY2slMjBtYXJrZXQlMjBhbmQlMjBleGNoYW5nZXxlbnwwfHwwfHx8MA%3D%3D')`,
            }}
        >
            <div className="w-full max-w-sm mx-auto border border-gray-200 rounded-lg p-6 backdrop-blur-sm bg-white/40 shadow-lg">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        convert();
                    }}
                >
                    {/* From Input */}
                    <div className="mb-4">
                        <InputBox
                            label="From"
                            amount={amount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => setFrom(currency)}
                            selectCurrency={from}
                            onAmountChange={(amount) => setAmount(amount)}
                        />
                    </div>

                    {/* Swap Icon */}
                    <div className="flex justify-center my-4">
                        <button
                            type="button"
                            onClick={swap}
                            className="p-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:rotate-180 focus:outline-none focus:ring-4 focus:ring-green-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 7h16M4 7l4 4m-4-4l4-4m0 10h16m0 0l-4 4m4-4l-4-4"
                                />
                            </svg>
                        </button>

                    </div>

                    {/* To Input */}
                    <div className="mb-6">
                        <InputBox
                            label="To"
                            amount={convertedAmount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => setTo(currency)}
                            selectCurrency={to}
                            amountDisable
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default App;
