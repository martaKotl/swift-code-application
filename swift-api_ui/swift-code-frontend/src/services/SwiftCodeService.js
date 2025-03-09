import axios from "axios";

const SWIFT_CODE_API_BASE_URL = "http://localhost:8080/v1/swift-codes";

class SwiftCodeService {

    saveSwiftCode(swiftCode){
        return axios.post(SWIFT_CODE_API_BASE_URL, swiftCode);
    }

    getSwiftCode(swiftCode){
        return axios.get(`${SWIFT_CODE_API_BASE_URL}/${swiftCode.toUpperCase()}`);
    }

    getSwiftCodeByCountry(countryISO2){
        return axios.get(`${SWIFT_CODE_API_BASE_URL}/country/${countryISO2.toUpperCase()}`);
    }

    deleteSwiftCode(swiftCode) {
        return axios.delete(`${SWIFT_CODE_API_BASE_URL}/${swiftCode.toUpperCase()}`);
    }
}

export default new SwiftCodeService();