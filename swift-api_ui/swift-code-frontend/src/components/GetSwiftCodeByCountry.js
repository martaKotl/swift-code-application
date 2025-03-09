import React, { useState } from "react"
import SwiftCodeService from '../services/SwiftCodeService';
import SwiftCode from "./SwiftCode";
import { useNavigate } from 'react-router-dom';

const GetSwiftCodeByCountry = () => {

  const [loading, setLoading] = useState(true);
  const [swiftCodes, setSwiftCodes] = useState([]);
  const [searchSwiftCode, setSearchSwiftCode] = useState("");

  const handleChange = (e) => {
          setSearchSwiftCode(e.target.value);
      }
  
      const handleSearch = () => {
          if (!searchSwiftCode.trim()) return;
          setLoading(true);

          SwiftCodeService.getSwiftCodeByCountry(searchSwiftCode)
              .then((response) => {
                setSwiftCodes(response.data.filter(swift => swift.countryISO2));
              })
              .catch((error) => {
                  console.log(error);
                  setSwiftCodes([]);
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
              if(Array.isArray(swiftCodes)) {
                setSwiftCodes((previousSwiftCode) => {
                    return previousSwiftCode.filter((swiftCode) => swiftCode.swiftCode !== swiftCode);
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
            <label className="block text-slate-500 text-xl font-normal">Write Country ISO2 Code to get the list:</label>
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
        {/* Searching country info */}
        {!loading && swiftCodes.length > 0 && (
            <div className=" h-14 w-full py-4 px-10">
                <label className="block text-slate-500 text-xl font-normal">Country ISO2 Code: {swiftCodes[0].countryISO2}</label>
                <label className="block text-slate-500 text-xl font-normal">Country Name: {swiftCodes[0].countryName}</label>
            </div>
        )}
        {/* Table with Swift Code */}
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
                {!loading && swiftCodes.length > 0 &&  (
                    <tbody className="bg-white">
                        {swiftCodes.map((swiftCode) => (
                            <SwiftCode swiftCode={swiftCode} deleteSwiftCode={deleteSwiftCode} key={swiftCode.swiftCode}></SwiftCode>
                        ))}
                    </tbody>
                )}
            </table>
        </div>              
    </div>
  )
}

export default GetSwiftCodeByCountry