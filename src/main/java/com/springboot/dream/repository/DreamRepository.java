package com.springboot.dream.repository;

import com.springboot.dream.entity.Dream;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DreamRepository extends JpaRepository<Dream, Long> {
    Page<Dream> findByDreamKeywords_NameContaining(String keyword, Pageable pageable);

}
