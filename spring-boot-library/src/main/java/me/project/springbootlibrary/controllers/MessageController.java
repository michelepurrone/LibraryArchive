package me.project.springbootlibrary.controllers;

import me.project.springbootlibrary.models.Message;
import me.project.springbootlibrary.services.MessageService;
import me.project.springbootlibrary.support.exceptions.AdminExclusiveException;
import me.project.springbootlibrary.support.requests.AdminQuestionRequest;
import me.project.springbootlibrary.utils.ExtractJWT;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("***")
@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/secure/add/message")
    public void postMessage(@RequestHeader(value="Authorization") String token, @RequestBody Message messageRequest) {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        messageService.postMessage(messageRequest, userEmail);
    }

    @PutMapping("/secure/admin/message")
    public void putMessage(@RequestHeader(value="Authorization") String token, @RequestBody AdminQuestionRequest adminQuestionRequest) {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")) {
            throw new AdminExclusiveException("Admin exclusive!");
        }
        messageService.putMessage(adminQuestionRequest, userEmail);
    }

}
