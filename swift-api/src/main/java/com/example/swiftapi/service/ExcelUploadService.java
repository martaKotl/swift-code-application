package com.example.swiftapi.service;

import com.example.swiftapi.model.SwiftCode;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Objects;

public class ExcelUploadService {
    public static boolean isValidExcelFile(File file){
        return Objects.equals(file.getParentFile(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    }

    public static List<SwiftCode> getSwiftCodeDataFromFile(InputStream inputStream){
        List<SwiftCode> swiftCodes = new ArrayList<>();

        try {
            XSSFWorkbook workbook = new XSSFWorkbook(inputStream);
            XSSFSheet sheet = workbook.getSheet("Sheet1");

            int rowIndex = 0;
            for(Row row : sheet){
                if(rowIndex == 0){
                    rowIndex++;
                    continue;
                }

                Iterator<Cell> cellIterator = row.iterator();
                int cellIndex = 0;
                SwiftCode swiftCode = new SwiftCode();

                while(cellIterator.hasNext()){
                    Cell cell = cellIterator.next();
                    switch (cellIndex){
                        case 0 -> swiftCode.setCountryISO2(cell.getStringCellValue());
                        case 1 -> swiftCode.setSwiftCode(cell.getStringCellValue());
                        case 3 -> swiftCode.setBankName(cell.getStringCellValue());
                        case 4 -> swiftCode.setAddress(cell.getStringCellValue());
                        case 6 -> swiftCode.setCountryName(cell.getStringCellValue());
                    }
                    cellIndex++;
                }
                swiftCode.setIsHeadquarter(swiftCode.getSwiftCode().endsWith("XXX"));

                swiftCodes.add(swiftCode);
            }
        }catch (Exception e) {
            e.getStackTrace();
            throw new RuntimeException("Error reading Excel file: " + e.getMessage());
        }

        return swiftCodes;
    }
}
