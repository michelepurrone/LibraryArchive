package me.project.springbootlibrary.support.responses;

import lombok.Data;

@Data
public class DownloadResponse {

    private String title;

    private String pdf;

    public DownloadResponse(String title, String pdf) {
        this.title = title;
        this.pdf = pdf;
    }

}
