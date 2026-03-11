package com.agrilinker.backend.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.ThreadLocalRandom;

public class OrderNumberGenerator {

    public static String generate() {
        String date = LocalDate.now().format(DateTimeFormatter.BASIC_ISO_DATE); // YYYYMMDD
        int random = ThreadLocalRandom.current().nextInt(1000, 10000); // 4 digits
        return "AGL-" + date + "-" + random;
    }
}
