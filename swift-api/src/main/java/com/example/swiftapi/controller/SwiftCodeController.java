package com.example.swiftapi.controller;

import com.example.swiftapi.model.SwiftCode;
import com.example.swiftapi.service.SwiftCodeService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/v1/swift-codes")
public class SwiftCodeController {
    private final SwiftCodeService service;

    @Autowired
    public SwiftCodeController(SwiftCodeService service) {
        this.service = service;
    }

    @PostConstruct
    public void init() {
        service.loadSwiftCodesToDatabase();
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadSwiftCodes(){
        try{
            service.loadSwiftCodesToDatabase();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return  ResponseEntity.ok("Data from file added to database");
    }

    @PostMapping
    public ResponseEntity<String> addSwiftCode(@RequestBody SwiftCode swiftCode){
        try {
            service.addSwiftCode(swiftCode);
            return ResponseEntity.ok("Swift Code added");
        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        }

    }

    @DeleteMapping("/{swiftCode}")
    public ResponseEntity<String> deleteSwiftCode(@PathVariable String swiftCode){
        service.deleteSwiftCode(swiftCode);
        return ResponseEntity.ok("Swift Code deleted");
    }

    @GetMapping("/{swiftCode}")
    public ResponseEntity<SwiftCode> getSwiftCode(@PathVariable String swiftCode){
        Optional<SwiftCode> optionalSwiftCode = service.getSwiftCode(swiftCode);

        return optionalSwiftCode.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/country/{countryISO2}")
    public List<SwiftCode> getSwiftCodeByCountry(@PathVariable String countryISO2){
        return service.getSwiftCodeByCountry(countryISO2);
    }
}
