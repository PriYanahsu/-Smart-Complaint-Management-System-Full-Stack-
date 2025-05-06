package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Base64;

@Entity
@Data
@Table(name = "DataEntry")
public class EntityComplaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String problemName;
    private String description;
    private String location;
    private String time;

    @Lob
    private byte[] image;

    @Transient
    private String imageBase64; // This is used for displaying image on frontend

    // getters and setters for all fields
    public String getImageBase64() {
        return imageBase64;
    }

    public void setImageBase64(String imageBase64) {
        this.imageBase64 = imageBase64;
    }

    public String getProblemName() {
        return problemName;
    }

    public void setProblemName(String problem){
        this.problemName = problem;
    }

    public String getDescription() {
        return description;
    }


    public String getLocation() {
        return location;
    }

    public String getTime() {
        return time;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public long getId() {
        return id;
    }

}
