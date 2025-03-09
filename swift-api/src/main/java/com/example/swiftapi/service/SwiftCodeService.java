package com.example.swiftapi.service;

import com.example.swiftapi.model.SwiftCode;
import com.example.swiftapi.repository.SwiftCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

@Service
public class SwiftCodeService {

    private final SwiftCodeRepository repository;

    @Autowired
    public SwiftCodeService(SwiftCodeRepository repository) {
        this.repository = repository;
    }

    public void loadSwiftCodesToDatabase(){
        try {
            InputStream inputStream = getClass().getClassLoader().getResourceAsStream("Interns_2025_SWIFT_CODES.xlsx");
            List<SwiftCode> swiftCodeList = ExcelUploadService.getSwiftCodeDataFromFile(inputStream);
            this.repository.saveAll(swiftCodeList);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void addSwiftCode(SwiftCode swiftCode) {
        if (swiftCode.getSwiftCode() == null || swiftCode.getSwiftCode().trim().isEmpty()) {
            throw new IllegalArgumentException("SWIFT Code cannot be empty");
        }

        Optional<SwiftCode> existing = repository.findById(swiftCode.getSwiftCode());
        if (existing.isPresent()) {
            throw new IllegalStateException("SWIFT Code already exists");
        }

        Optional<SwiftCode> countryISO2Existing = repository.findFirstByCountryISO2(swiftCode.getCountryISO2());
        if (countryISO2Existing.isPresent()) {
            if(!countryISO2Existing.get().getCountryName().equals(swiftCode.getCountryName())) {
                throw new IllegalArgumentException("Country Name does not match the existing record for this countryISO2. The correct Country Name: "
                        + countryISO2Existing.get().getCountryName());
            }
        }

        if (swiftCode.getSwiftCode().endsWith("XXX") && swiftCode.getIsHeadquarter().equals(false)) {
            throw  new IllegalArgumentException("Swift Code ends wit XXX is headquarter." +
                    " Change isHeadquarter to true or change Swift Code.");
        }

        if (!swiftCode.getSwiftCode().endsWith("XXX") && swiftCode.getIsHeadquarter().equals(true)) {
            throw  new IllegalArgumentException("Swift Code doesn't end wit XXX." +
                    " Change isHeadquarter to false or change Swift Code.");
        }

        repository.save(swiftCode);
    }

    public void deleteSwiftCode(String swiftCode){
        if (swiftCode == null || swiftCode.trim().isEmpty()) {
            throw new IllegalArgumentException("SWIFT Code cannot be empty");
        }

        Optional<SwiftCode> existing = repository.findById(swiftCode);

        if (existing.isEmpty()) {
            throw new IllegalStateException("SWIFT Code doesn't exist");
        }

        repository.deleteById(swiftCode);
    }

    public Optional<SwiftCode> getSwiftCode(String swiftCode){
        return this.repository.findById(swiftCode.toUpperCase());
    }

    public List<SwiftCode> getSwiftCodeByCountry(String countryISO2){
        return repository.findByCountryISO2(countryISO2);
    }
}
