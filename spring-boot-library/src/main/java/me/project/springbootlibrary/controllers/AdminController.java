package me.project.springbootlibrary.controllers;

import me.project.springbootlibrary.services.AdminService;
import me.project.springbootlibrary.support.exceptions.AdminExclusiveException;
import me.project.springbootlibrary.support.requests.AddBookRequest;
import me.project.springbootlibrary.utils.ExtractJWT;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("***")
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PutMapping("/secure/increase/book/quantity")
    public void increaseBookQuantity(@RequestHeader(value="Authorization") String token, @RequestParam Long bookId) {
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if(admin == null || !admin.equals("admin")) {
            throw new AdminExclusiveException("Admin exclusive!");
        }
        adminService.increaseBookQuantity(bookId);
    }

    @PutMapping("/secure/decrease/book/quantity")
    public void decreaseBookQuantity(@RequestHeader(value="Authorization") String token, @RequestParam Long bookId) {
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if(admin == null || !admin.equals("admin")) {
            throw new AdminExclusiveException("Admin exclusive!");
        }
        adminService.decreaseBookQuantity(bookId);
    }

    @PostMapping("/secure/add/book")
    public void postBook(@RequestHeader(value="Authorization") String token, @RequestBody AddBookRequest addBookRequest) {
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if(admin == null || !admin.equals("admin")) {
            throw new AdminExclusiveException("Admin exclusive!");
        }
        adminService.postBook(addBookRequest);
    }

    @DeleteMapping("/secure/delete/book")
    public void deleteBook(@RequestHeader(value="Authorization") String token, @RequestParam Long bookId) {
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if(admin == null || !admin.equals("admin")) {
            throw new AdminExclusiveException("Admin exclusive!");
        }
        adminService.deleteBook(bookId);
    }

}
