package com.pol.gg.backend.domain.post;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByDepartment(String department);
    List<Post> findByCategory(String category);
}
