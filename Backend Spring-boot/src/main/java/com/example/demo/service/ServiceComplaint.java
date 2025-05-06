//package com.example.demo.service;
//
//import com.example.demo.entity.EntityComplaint;
//import com.example.demo.repository.ComplaintRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.util.List;
//
//@Service
//public class ServiceComplaint {
//
//    @Autowired
//    private ComplaintRepository complaintRepository;
//
//    public EntityComplaint saveComplaint(String problemName, String description, String location, String time, MultipartFile image) throws IOException {
//        EntityComplaint complaint = new EntityComplaint();
//        complaint.setProblemName(problemName);
//        complaint.setDescription(description);
//        complaint.setLocation(location);
//        complaint.setTime(time);
//
//        if (image != null && !image.isEmpty()) {
//            complaint.setImage(image.getBytes());
//        }
//
//        return complaintRepository.save(complaint);
//    }
//
//    public List<EntityComplaint> getAllComplaints() {
//        return complaintRepository.findAll();
//    }
//}
