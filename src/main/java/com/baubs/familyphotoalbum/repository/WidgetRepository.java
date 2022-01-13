package com.baubs.familyphotoalbum.repository;

import com.baubs.familyphotoalbum.domain.Widget;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Widget entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WidgetRepository extends JpaRepository<Widget, Long> {}
