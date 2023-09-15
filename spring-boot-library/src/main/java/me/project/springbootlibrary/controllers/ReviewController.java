package me.project.springbootlibrary.controllers;

import me.project.springbootlibrary.services.ReviewService;
import me.project.springbootlibrary.support.exceptions.EmailNotFoundException;
import me.project.springbootlibrary.support.requests.ReviewRequest;
import me.project.springbootlibrary.utils.ExtractJWT;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("***")
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private ReviewService reviewService;

    public ReviewController (ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/secure/user/book")
    public Boolean reviewBookByUser(@RequestHeader(value="Authorization") String token, @RequestParam Long bookId) {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        if(userEmail == null) {
            throw new EmailNotFoundException("Email not found!");
        }
        return reviewService.userReviewListed(userEmail, bookId);
    }

    @PostMapping("/secure")
    public void postReview(@RequestHeader(value="Authorization") String token, @RequestBody ReviewRequest reviewRequest) {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        if(userEmail == null) {
            throw new EmailNotFoundException("Email not found!");
        }
        reviewService.postReview(userEmail, reviewRequest);
    }

}
