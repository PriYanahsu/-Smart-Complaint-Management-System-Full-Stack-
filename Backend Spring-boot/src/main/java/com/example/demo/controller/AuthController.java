//package com.example.demo.controller;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/auth")
//@CrossOrigin(origins = "*")
//public class AuthController {
//
//    private static final String ADMIN_NAME = "admin";
//    private static final String ADMIN_PASSWORD = "admin";
//    private static final String USER_NAME = "user";
//    private static final String USER_PASSWORD = "user";
//
//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
//        if (ADMIN_NAME.equals(loginRequest.getUsername()) && ADMIN_PASSWORD.equals(loginRequest.getPassword())) {
//            return ResponseEntity.ok("Admin Login Successful");
//        }
//        else if (USER_NAME.equals(loginRequest.getUsername()) && USER_PASSWORD.equals(loginRequest.getPassword())) {
//            return ResponseEntity.ok("User Login Successful");
//        }
//        else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
//        }
//    }
//}
//
//// DTO Class for Login Request
//class LoginRequest {
//    private String username;
//    private String password; // Renamed correctly
//
//    public String getUsername() { return username; }
//    public void setUsername(String username) { this.username = username; }
//
//    public String getPassword() { return password; }
//    public void setPassword(String password) { this.password = password; }
//}
