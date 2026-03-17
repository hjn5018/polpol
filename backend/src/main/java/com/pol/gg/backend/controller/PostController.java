package com.pol.gg.backend.controller;

import com.pol.gg.backend.domain.post.Post;
import com.pol.gg.backend.domain.post.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PostController {

    private final PostRepository postRepository;

    @GetMapping
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @GetMapping("/department/{dept}")
    public List<Post> getPostsByDepartment(@PathVariable String dept) {
        return postRepository.findByDepartment(dept);
    }
}
