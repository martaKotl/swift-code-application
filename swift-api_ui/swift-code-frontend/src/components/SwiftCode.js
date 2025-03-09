import React from 'react'

const SwiftCode = ( {swiftCode, deleteSwiftCode} ) => {
  return (
    <tr>
        <td className="text-left text-gray-500 px-6 py-4 whitespace-nowrap">
            <div>{swiftCode.address}</div>
        </td>
        <td className="text-left text-gray-500 px-6 py-4 whitespace-nowrap">
            <div>{swiftCode.bankName}</div>
        </td>
        <td className="text-left text-gray-500 px-6 py-4 whitespace-nowrap">
            <div>{swiftCode.countryISO2}</div>
        </td>
        <td className="text-left text-gray-500 px-6 py-4 whitespace-nowrap">
            <div>{swiftCode.countryName}</div>
        </td>
        <td className="text-left text-gray-500 px-6 py-4 whitespace-nowrap">
            <div>{swiftCode.isHeadquarter ? "True" : "False"}</div>
        </td>
        <td className="text-left text-gray-500 px-6 py-4 whitespace-nowrap">
            <div>{swiftCode.swiftCode}</div>
        </td>
        <td className="text-right text-gray-500 px-6 py-4 whitespace-nowrap">
            <a
                onClick={(e) => deleteSwiftCode(e, swiftCode.swiftCode)}
                className="text-red-400 hover:text-red-500 hover:cursor-pointer">
                Delete
            </a>
        </td>
    </tr>
  )
}

export default SwiftCode