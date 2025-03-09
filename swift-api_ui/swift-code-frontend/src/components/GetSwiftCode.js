import React, { useState } from "react";
import SwiftCodeService from '../services/SwiftCodeService';
import SwiftCode from "./SwiftCode";
import SwiftCodeBranch from "./SwiftCodeBranch";
import { useNavigate } from 'react-router-dom';

const GetSwiftCode = () => {

    const [loading, setLoading] = useState(true);
    const [swiftCode, setSwiftCode] = useState(null);
    const [branches, setBranches] = useState([]);
    const [searchSwiftCode, setSearchSwiftCode] = useState("");

    const handleChange = (e) => {
        setSearchSwiftCode(e.target.value);
    }

    const handleSearch = () => {
        if (!searchSwiftCode.trim()) return;
        setLoading(true);

        SwiftCodeService.getSwiftCode(searchSwiftCode)
            .then((response) => {
                const mainSwiftCode = response.data;

                if (!mainSwiftCode) {
                    setSwiftCode(null);
                    setBranches([]);
                    throw new Error("No matching Swift Code found");
                }
                setSwiftCode(mainSwiftCode);
                
                if (!mainSwiftCode.isHeadquarter) {
                    setBranches([]);
                    return;
                }

                const swiftCodePrefix = mainSwiftCode.swiftCode.substring(0, 8);
                return SwiftCodeService.getSwiftCodeByCountry(mainSwiftCode.countryISO2)
                    .then((countryResponse) => {
                        const branchesList = countryResponse.data.filter(swift =>
                            !swift.isHeadquarter && swift.swiftCode.substring(0, 8) === swiftCodePrefix);

                        setBranches(branchesList);
                    });
            })
        .catch((error) => {
            console.error(error);
            setSwiftCode(null);
            setBranches([]);
        })
        .finally(() => {
            setLoading(false);
        });
    };

    const deleteSwiftCode = (e, swiftCode) => {
        e.preventDefault();
        if (!swiftCode) {
            console.error("Error: swiftCode is undefined or null");
            return;
        }
        SwiftCodeService.deleteSwiftCode(swiftCode).then((response) => {
            if(swiftCode) {
                setSwiftCode(null);
            }
        });
        console.log("Swift Code deleted");
    };
    
    const deleteSwiftCodeBranch = (e, swiftCode) => {
        e.preventDefault();
        if (!swiftCode) {
            console.error("Error: branch is undefined or null");
            return;
        }
        SwiftCodeService.deleteSwiftCode(swiftCode).then((response) => {
            if(Array.isArray(branches)) {
                setBranches((previousBranches) => {
                    return previousBranches.filter((branch) => branch.swiftCode !== swiftCode);
                });
            }
        });
        console.log("Swift Code deleted");
    };

    const navigate = useNavigate();

    const exit = (e) => {
        navigate("/");
    }

  return (
    <div className="py-3">
        {/* Label, input and search button for main Swift Code */}
        <div className="items-center justify-center h-14 w-full my-4 px-6">
            <label className="block text-slate-500 text-xl font-normal">Write Swift Code To Get:</label>
            <input 
                type="text"
                name="swiftCode"
                value={searchSwiftCode}
                onChange={(e) => handleChange(e)}
                className="h-10 w-96 border mt-2 px-2 py-2">
            </input>
            <button onClick={handleSearch} className="rounded text-white font-semibold bg-emerald-500 hover:bg-emerald-700 px-6 py-2 mx-6">
                Search
            </button>
            <button onClick={exit} className="rounded text-white font-semibold bg-red-700 hover:bg-red-900 px-6 py-2 mx-6">
                Exit
            </button>
        </div>
        {/* Table with main Swift Code */}
        <div className="flex shadow border-b py-6">
            <table className="min-w-full">
                <thead className="bg-gray-50 text-slate-500">
                    <tr>
                        <th className="text-left px-4 py-3">Address</th>
                        <th className="text-left px-4 py-3">Bank Name</th>
                        <th className="text-left px-4 py-3">Country ISO2</th>
                        <th className="text-left px-4 py-3">Country Name</th>
                        <th className="text-left px-4 py-3">isHeadquarter</th>
                        <th className="text-left px-4 py-3">Swift Code</th>
                        <th className="text-left px-4 py-3"></th>
                    </tr>
                </thead>
                {!loading && (
                    <tbody className="bg-white">
                        {swiftCode && (
                            <SwiftCode swiftCode={swiftCode} deleteSwiftCode={deleteSwiftCode} key={swiftCode.swiftCode}></SwiftCode>
                        )}
                    </tbody>
                )}
            </table>
        </div>
        {/* Show branches only if main Swift Code is Headquarter */}
        {swiftCode && swiftCode.isHeadquarter && (
                <>
                    {/* Label */}
                    <div className="items-center justify-center h-10 w-full my-4 py-6 px-6">
                        <label className="block text-slate-500 text-xl font-normal">Branches:</label>
                    </div>
                    {/* Table with branches of main Swift Code */}
                    <div className="flex shadow border-b">
                        <table className="min-w-full">
                            <thead className="bg-gray-50 text-slate-500">
                                <tr>
                                    <th className="text-left px-4 py-3">Address</th>
                                    <th className="text-left px-4 py-3">Bank Name</th>
                                    <th className="text-left px-4 py-3">Country ISO2</th>
                                    <th className="text-left px-4 py-3">isHeadquarter</th>
                                    <th className="text-left px-4 py-3">Swift Code</th>
                                    <th className="text-left px-4 py-3"></th>
                                </tr>
                            </thead>
                            {!loading && branches.length > 0 && (
                            <tbody className="bg-white">
                                {branches.map((branch) => (
                                    <SwiftCodeBranch branch={branch} deleteSwiftCodeBranch={deleteSwiftCodeBranch} key={branch.swiftCode}></SwiftCodeBranch>
                                ))}
                            </tbody>
                            )}
                        </table>
                    </div>
                </>
            )}        
    </div>
  );
}

export default GetSwiftCode