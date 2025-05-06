package com.example.demo.controller;

import com.example.demo.entity.EntityComplaint;
import com.example.demo.repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/complaint")
@CrossOrigin(origins = "*")
public class ComplaintController {

    @Autowired
    private ComplaintRepository repository;

    // Endpoint to submit a complaint
    @PostMapping("/submit")
    public ResponseEntity<String> submitComplaint(
            @RequestParam String problemName,
            @RequestParam String description,
            @RequestParam String location,
            @RequestParam String time,
            @RequestParam(required = false) MultipartFile image) {

        // Validate required parameters
        if (problemName.isEmpty() || description.isEmpty() || location.isEmpty() || time.isEmpty()) {
            return ResponseEntity.badRequest().body("Missing required fields.");
        }

        EntityComplaint complaint = new EntityComplaint();
        complaint.setProblemName(problemName);
        complaint.setDescription(description);
        complaint.setLocation(location);
        complaint.setTime(time);

        try {
            // Handle image upload
            if (image != null && !image.isEmpty()) {
                complaint.setImage(image.getBytes());
            }
            // Save complaint to the repository
            repository.save(complaint);
            return ResponseEntity.ok("Complaint submitted successfully.");
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Image upload failed: " + e.getMessage());
        }
    }

    // Endpoint to get all complaints
    @GetMapping
    public ResponseEntity<List<EntityComplaint>> getAllComplaints() {
        List<EntityComplaint> complaints = repository.findAll();

        // Convert images to Base64 format
        complaints.forEach(c -> {
            if (c.getImage() != null) {
                c.setImageBase64("data:image/jpeg;base64," + Base64.getEncoder().encodeToString(c.getImage()));
            }
        });
        return ResponseEntity.ok(complaints);
    }

    // Endpoint to delete a complaint by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteComplaint(@PathVariable Long id) {
        // Check if the complaint exists
        EntityComplaint complaint = repository.findById(id).orElse(null);

        if (complaint != null) {
            repository.deleteById(id);
            return ResponseEntity.ok("Complaint deleted successfully.");
        } else {
            return ResponseEntity.status(404).body("Complaint not found.");
        }
    }
}
