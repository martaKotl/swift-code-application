package com.example.swiftapi.controller;

import com.example.swiftapi.model.SwiftCode;
import com.example.swiftapi.service.SwiftCodeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class SwiftCodeControllerTest {

    @Mock
    private SwiftCodeService swiftCodeService;

    @InjectMocks
    private SwiftCodeController swiftCodeController;
    private SwiftCode swiftCode;

    @BeforeEach
    void setUp() {
        swiftCode = new SwiftCode();
        swiftCode.setSwiftCode("TESTPLPLXXX");
        swiftCode.setCountryISO2("PL");
        swiftCode.setBankName("Test Bank");
        swiftCode.setAddress("Test Address");
        swiftCode.setCountryName("Poland");
        swiftCode.setIsHeadquarter(true);
    }

    @Test
    void addSwiftCode() {
        doNothing().when(swiftCodeService).addSwiftCode(swiftCode);

        ResponseEntity<String> response = swiftCodeController.addSwiftCode(swiftCode);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Swift Code added", response.getBody());
    }

    @Test
    void deleteSwiftCode() {
        doNothing().when(swiftCodeService).deleteSwiftCode(swiftCode.getSwiftCode());

        ResponseEntity<String> response = swiftCodeController.deleteSwiftCode(swiftCode.getSwiftCode());

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Swift Code deleted", response.getBody());
    }

    @Test
    void getSwiftCode() {
        when(swiftCodeService.getSwiftCode(swiftCode.getSwiftCode())).thenReturn(Optional.of(swiftCode));

        ResponseEntity<SwiftCode> response = swiftCodeController.getSwiftCode(swiftCode.getSwiftCode());

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("TESTPLPLXXX", response.getBody().getSwiftCode());
    }

    @Test
    void getSwiftCodeByCountry() {
        when(swiftCodeService.getSwiftCodeByCountry("PL")).thenReturn(List.of(swiftCode));

        List<SwiftCode> result = swiftCodeController.getSwiftCodeByCountry("PL");

        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        assertEquals("PL", result.getFirst().getCountryISO2());
    }
}