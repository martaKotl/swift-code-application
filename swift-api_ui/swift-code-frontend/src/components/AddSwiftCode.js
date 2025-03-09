import React, { useState } from 'react'
import SwiftCodeService from '../services/SwiftCodeService';
import { useNavigate } from 'react-router-dom';

const AddSwiftCode = () => {

    const [swiftCode, setSwiftCode] = useState({
        address: "",
        bankName: "",
        countryISO2: "",
        countryName: "",
        isHeadquarter: false,
        swiftCode: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        let { name, value } = e.target;

        if(name !== "isHeadquarter"){
            value = value.toUpperCase();
        }

        setSwiftCode({ ...swiftCode, [name]: value });
    }

    const saveSwiftCode = (e) => {
        e.preventDefault();
        SwiftCodeService.saveSwiftCode(swiftCode)
        .then((response) => {
            console.log(response);
            navigate("/");
        })
        .catch((error) => {
            console.error(error);
            alert(error.response?.data || "An error occurred while saving the Swift Code.");
        })
    };

    const reset = (e) => {
        e.preventDefault();
        setSwiftCode({
            address: "",
            bankName: "",
            countryISO2: "",
            countryName: "",
            isHeadquarter: false,
            swiftCode: "",
        });
    }

    const exit = (e) => {
        navigate("/");
    }

  return (
    <div className="flex max-w-2xl mx-auto shadow border-b">
        <div className="px-8 py-8">
            <div className="font-serif text-2xl tracking-wider text-slate-600">
                <h1>Add New Swift Code</h1>
            </div>
            <div className="items-center justify-center h-14 w-full my-4">
                <label className="block text-slate-500 text-xl font-normal">Adress</label>
                <input 
                    type="text"
                    name="address"
                    value={swiftCode.address}
                    onChange={(e) => handleChange(e)}
                    className="h-10 w-96 border mt-2 px-2 py-2">
                </input>
            </div>
            <div className="items-center justify-center h-14 w-full my-6">
                <label className="block text-slate-500 text-xl font-normal">Bank Name</label>
                <input 
                    type="text"
                    name="bankName"
                    value={swiftCode.bankName}
                    onChange={(e) => handleChange(e)}
                    className="h-10 w-96 border mt-2 px-2 py-2">
                </input>
            </div>
            <div className="items-center justify-center h-14 w-full my-6">
                <label className="block text-slate-500 text-xl font-normal">Country ISO2 Code</label>
                <input 
                    type="text"
                    name="countryISO2"
                    value={swiftCode.countryISO2}
                    onChange={(e) => handleChange(e)}
                    className="h-10 w-96 border mt-2 px-2 py-2">
                </input>
            </div>
            <div className="items-center justify-center h-14 w-full my-6">
                <label className="block text-slate-500 text-xl font-normal">Country Name</label>
                <input 
                    type="text"
                    name="countryName"
                    value={swiftCode.countryName}
                    onChange={(e) => handleChange(e)}
                    className="h-10 w-96 border mt-2 px-2 py-2">
                </input>
            </div>
            <div className="items-center justify-center h-14 w-full my-6">
                <label className="block text-slate-500 text-xl font-normal">Is Headquarter</label>
                <input 
                    type="boolean"
                    name="isHeadquarter"
                    value={swiftCode.isHeadquarter}
                    onChange={(e) => handleChange(e)}
                    className="h-10 w-96 border mt-2 px-2 py-2">
                </input>
            </div>
            <div className="items-center justify-center h-14 w-full my-6">
                <label className="block text-slate-500 text-xl font-normal">Swift Code</label>
                <input 
                    type="text"
                    name="swiftCode"
                    value={swiftCode.swiftCode}
                    onChange={(e) => handleChange(e)}
                    className="h-10 w-96 border mt-2 px-2 py-2">
                </input>
            </div>
            <div className="items-center justify-center h-14 w-full my-6 space-x-4 pt-4">
                <button onClick={saveSwiftCode} className="rounded text-white font-semibold bg-emerald-500 hover:bg-emerald-700 px-6 py-2">
                    Save
                </button>
                <button 
                    onClick={reset}
                    className="rounded text-white font-semibold bg-red-500 hover:bg-red-700 px-6 py-2">
                    Clear
                </button>
                <button 
                    onClick={exit}
                    className="rounded text-white font-semibold bg-red-700 hover:bg-red-900 px-6 py-2">
                    Exit
                </button>
            </div>
        </div>
    </div>
  )
}

export default AddSwiftCode