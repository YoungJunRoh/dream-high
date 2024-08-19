package com.springboot.dream.repository;

import com.springboot.dream.entity.Dream;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DreamRepository extends JpaRepository<Dream, Long> {
}
