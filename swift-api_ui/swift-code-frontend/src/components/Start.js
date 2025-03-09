import React from 'react'
import { useNavigate } from 'react-router-dom'

function Start() {

    const navigate = useNavigate();

  return (
    <div className="container mx-auto my-10">
        <div className="h-12">
            <button 
                onClick={() => navigate("/addSwiftCode")}
                className="rounded bg-cyan-600 text-white hover:bg-cyan-700 font-semibold px-6 py-2 mx-10">
                Add Swift Code
            </button>
        </div>
        <div className="h-12">
            <button
                onClick={() => navigate("/getSwiftCode")}
                className="rounded bg-cyan-600 text-white hover:bg-cyan-700 font-semibold px-7 py-2 mx-10 my-4">
                Get Swift Code
            </button>
        </div>
        <div className="h-12">
            <button
                onClick={() => navigate("/getSwiftCodeByCountry")}
                className="rounded bg-cyan-600 text-white hover:bg-cyan-700 font-semibold px-3 py-2 mx-4 my-8">
                Get Swift Code By Country
            </button>
        </div>
    </div>
  )
}

export default Start