package com.baubs.familyphotoalbum.repository;

import com.baubs.familyphotoalbum.domain.UserWidgets;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the UserWidgets entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserWidgetsRepository extends JpaRepository<UserWidgets, Long> {}
