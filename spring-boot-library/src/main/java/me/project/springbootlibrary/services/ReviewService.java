package me.project.springbootlibrary.services;

import me.project.springbootlibrary.models.Review;
import me.project.springbootlibrary.repositories.ReviewRepository;
import me.project.springbootlibrary.support.exceptions.ReviewAlreadyCreatedException;
import me.project.springbootlibrary.support.requests.ReviewRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;

@Service
@Transactional
public class ReviewService {

    private ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public void postReview(String userEmail, ReviewRequest reviewRequest) {
        Review validateReview = reviewRepository.findByUserEmailAndBookId(userEmail, reviewRequest.getBookId());
        if(validateReview != null) {
            throw new ReviewAlreadyCreatedException("Review already created!");
        }
        Review review = new Review();
        review.setBookId(reviewRequest.getBookId());
        review.setRating(reviewRequest.getRating());
        review.setUserEmail(userEmail);
        if(reviewRequest.getReviewDescription().isPresent()) {
            review.setReviewDescription(reviewRequest.getReviewDescription().map(
                    Object::toString
            ).orElse(null));
        }
        review.setDate(Date.valueOf(LocalDate.now()));
        reviewRepository.save(review);
    }

    public Boolean userReviewListed(String userEmail, Long bookId) {
        Review validateReview = reviewRepository.findByUserEmailAndBookId(userEmail, bookId);
        return validateReview != null;
    }

}
