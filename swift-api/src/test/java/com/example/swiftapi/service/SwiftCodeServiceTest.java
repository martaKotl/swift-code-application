package com.example.swiftapi.service;

import com.example.swiftapi.model.SwiftCode;
import com.example.swiftapi.repository.SwiftCodeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class SwiftCodeServiceTest {

    @Autowired
    private SwiftCodeService swiftCodeService;

    @Autowired
    private SwiftCodeRepository repository;

    private SwiftCode swiftCode;

    @BeforeEach
    void setUp() {
        repository.deleteAll();

        swiftCode = new SwiftCode();
        swiftCode.setSwiftCode("TESTPLPLXXX");
        swiftCode.setCountryISO2("PL");
        swiftCode.setBankName("Test Bank");
        swiftCode.setAddress("Test Address");
        swiftCode.setCountryName("Poland");
        swiftCode.setIsHeadquarter(true);

        repository.save(swiftCode);
    }

    @Test
    void shouldAddSwiftCode() {
        SwiftCode newSwift = new SwiftCode();
        newSwift.setSwiftCode("NEWPLPLXXX");
        newSwift.setCountryISO2("PL");
        newSwift.setBankName("New Bank");
        newSwift.setAddress("New Address");
        newSwift.setCountryName("Poland");
        newSwift.setIsHeadquarter(true);

        swiftCodeService.addSwiftCode(newSwift);

        Optional<SwiftCode> found = repository.findById("NEWPLPWXXX");
        assertTrue(found.isPresent());
        assertEquals("New Bank", found.get().getBankName());
    }
}