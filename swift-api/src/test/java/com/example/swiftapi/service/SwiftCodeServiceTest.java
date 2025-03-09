package com.example.swiftapi.service;

import com.example.swiftapi.model.SwiftCode;
import com.example.swiftapi.repository.SwiftCodeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

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

        Optional<SwiftCode> found = repository.findById("NEWPLPLXXX");
        assertTrue(found.isPresent());
        assertEquals("NEWPLPLXXX", found.get().getSwiftCode());
        assertEquals("New Bank", found.get().getBankName());
        assertEquals("New Address", found.get().getAddress());
        assertEquals("Poland", found.get().getCountryName());
        assertEquals(true, found.get().getIsHeadquarter());
    }

    @Test
    void shouldAddBranchSwiftCode() {
        SwiftCode newSwift = new SwiftCode();
        newSwift.setSwiftCode("NEWBRANCHX");
        newSwift.setCountryISO2("PL");
        newSwift.setBankName("New Branch Bank");
        newSwift.setAddress("New Branch Address");
        newSwift.setCountryName("Poland");
        newSwift.setIsHeadquarter(false);

        swiftCodeService.addSwiftCode(newSwift);

        Optional<SwiftCode> found = repository.findById("NEWBRANCHX");
        assertTrue(found.isPresent());
        assertEquals("NEWBRANCHX", found.get().getSwiftCode());
        assertEquals("New Branch Bank", found.get().getBankName());
        assertEquals("New Branch Address", found.get().getAddress());
        assertEquals("Poland", found.get().getCountryName());
        assertEquals(false, found.get().getIsHeadquarter());
    }

    @Test
    void shouldCheckIfBranchSwiftCode() {
        SwiftCode newSwift = new SwiftCode();
        newSwift.setSwiftCode("NEWBRANCHX");
        newSwift.setCountryISO2("PL");
        newSwift.setBankName("New Branch Bank");
        newSwift.setAddress("New Branch Address");
        newSwift.setCountryName("Poland");
        newSwift.setIsHeadquarter(true);

        assertThrows(RuntimeException.class, () -> swiftCodeService.addSwiftCode(newSwift));

        Optional<SwiftCode> found = repository.findById("NEWBRANCHX");
        assertFalse(found.isPresent());
    }

    @Test
    void shouldCheckIfHeadquarterSwiftCode() {
        SwiftCode newSwift = new SwiftCode();
        newSwift.setSwiftCode("NEWPLPLXXX");
        newSwift.setCountryISO2("PL");
        newSwift.setBankName("New Bank");
        newSwift.setAddress("New Address");
        newSwift.setCountryName("Poland");
        newSwift.setIsHeadquarter(false);

        assertThrows(RuntimeException.class, () -> swiftCodeService.addSwiftCode(newSwift));

        Optional<SwiftCode> found = repository.findById("NEWPLPLXXX");
        assertFalse(found.isPresent());
    }

    @Test
    void shouldDeleteSwiftCode() {
        swiftCodeService.deleteSwiftCode("TESTPLPLXXX");

        Optional<SwiftCode> found = repository.findById("TESTPLPLXXX");
        assertFalse(found.isPresent());
    }

    @Test
    void shouldNotDeleteSwiftCode() {
        assertThrows(RuntimeException.class, () -> swiftCodeService.deleteSwiftCode("TESTPLPLLLL"));

        Optional<SwiftCode> found = repository.findById("TESTPLPLLLL");
        assertFalse(found.isPresent());
    }

    @Test
    void shouldGetSwiftCodeById() {
        Optional<SwiftCode> found = repository.findById("TESTPLPLXXX");

        assertTrue(found.isPresent());
        assertEquals("TESTPLPLXXX", found.get().getSwiftCode());
        assertEquals("Test Bank", found.get().getBankName());
        assertEquals("Test Address", found.get().getAddress());
        assertEquals("Poland", found.get().getCountryName());
        assertEquals(true, found.get().getIsHeadquarter());
    }

    @Test
    void shouldGetSwiftCodeByCountry() {
        List<SwiftCode> result = swiftCodeService.getSwiftCodeByCountry("PL");

        assertEquals(1, result.size());
        assertEquals("Poland", result.getFirst().getCountryName());

    }
}