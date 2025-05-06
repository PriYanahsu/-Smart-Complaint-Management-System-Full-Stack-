package com.example.demo.controller;

import com.example.demo.utils.JwtUtil;
import com.example.demo.entity.AuthEntity;
import com.example.demo.repository.AuthRepo;
import com.example.demo.service.CustomUserDetailsService;
import com.example.demo.entity.AuthResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthControl {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthRepo repo;

    @PostMapping("/register")
    public ResponseEntity<?> registration(@RequestBody AuthEntity user) {
        if(repo.findByUsername(user.getUsername()).isPresent()) return ResponseEntity.badRequest().body("Username already registered");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        repo.save(user);
        if (Objects.equals(user.getRole(), "user")) {
            return ResponseEntity.ok("Registration Successful for user");
        }
        return ResponseEntity.ok("Registration Successful for admin");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthEntity user) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
            );

            UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());

            // Extract role from UserDetails (like "ROLE_ADMIN", "ROLE_USER")
            String actualRole = userDetails.getAuthorities().stream()
                    .findFirst()
                    .map(GrantedAuthority::getAuthority)
                    .orElse("");

            // Normalize the requested role from the frontend
            String requestedRole = "ROLE_" + user.getRole().toUpperCase();

            if (!actualRole.equals(requestedRole)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Role mismatch: Access denied");
            }

            String token = jwtUtil.generateToken(userDetails);

            // Send token and role as JSON
            Map<String, String> body = new HashMap<>();
            body.put("token", token);
            body.put("username", user.getUsername());
            body.put("role", user.getRole());

            return new ResponseEntity<>(body, HttpStatus.OK);

        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}


