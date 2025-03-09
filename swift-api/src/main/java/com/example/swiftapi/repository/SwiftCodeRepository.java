package com.example.swiftapi.repository;

import com.example.swiftapi.model.SwiftCode;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface SwiftCodeRepository extends JpaRepository<SwiftCode,String> {
    List<SwiftCode> findByCountryISO2(String countryISO2);
    Optional<SwiftCode> findFirstByCountryISO2(String countryISO2);
}
