package com.example.swiftapi.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "swift_codes")
@Getter @Setter
public class SwiftCode {
    @Id
    private String swiftCode;
    private String countryISO2;
    private String bankName;
    private String address;
    private String countryName;
    @Getter
    private Boolean isHeadquarter;
}