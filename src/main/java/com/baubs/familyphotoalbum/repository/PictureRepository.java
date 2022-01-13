package com.baubs.familyphotoalbum.repository;

import com.baubs.familyphotoalbum.domain.Picture;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Picture entity.
 */
@Repository
public interface PictureRepository extends JpaRepository<Picture, Long> {
    @Query("select picture from Picture picture where picture.user.login = ?#{principal.username}")
    List<Picture> findByUserIsCurrentUser();

    @Query(
        value = "select distinct picture from Picture picture left join fetch picture.tags",
        countQuery = "select count(distinct picture) from Picture picture"
    )
    Page<Picture> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct picture from Picture picture left join fetch picture.tags")
    List<Picture> findAllWithEagerRelationships();

    @Query("select picture from Picture picture left join fetch picture.tags where picture.id =:id")
    Optional<Picture> findOneWithEagerRelationships(@Param("id") Long id);
}
