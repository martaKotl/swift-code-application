import React from 'react'

const SwiftCodeBranch = ({ branch, deleteSwiftCodeBranch }) => {
  return (
    <tr key={branch.swiftCode}>
        <td className="text-left text-gray-500 px-6 py-4 whitespace-nowrap">
            <div>{branch.address}</div>
        </td>
        <td className="text-left text-gray-500 px-6 py-4 whitespace-nowrap">
            <div>{branch.bankName}</div>
        </td>
        <td className="text-left text-gray-500 px-6 py-4 whitespace-nowrap">
            <div>{branch.countryISO2}</div>
        </td>
        <td className="text-left text-gray-500 px-6 py-4 whitespace-nowrap">
            <div>{branch.isHeadquarter ? "True" : "False"}</div>
        </td>
        <td className="text-left text-gray-500 px-6 py-4 whitespace-nowrap">
            <div>{branch.swiftCode}</div>
        </td>
        <td className="text-right text-gray-500 px-6 py-4 whitespace-nowrap">
            <a 
                onClick={(e) => deleteSwiftCodeBranch(e, branch.swiftCode)} 
                className="text-red-400 hover:text-red-500 hover:cursor-pointer">
                Delete
            </a>
        </td>
    </tr>
  )
}

export default SwiftCodeBranch