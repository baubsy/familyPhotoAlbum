package com.baubs.familyphotoalbum.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.baubs.familyphotoalbum.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class UserWidgetsTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserWidgets.class);
        UserWidgets userWidgets1 = new UserWidgets();
        userWidgets1.setId(1L);
        UserWidgets userWidgets2 = new UserWidgets();
        userWidgets2.setId(userWidgets1.getId());
        assertThat(userWidgets1).isEqualTo(userWidgets2);
        userWidgets2.setId(2L);
        assertThat(userWidgets1).isNotEqualTo(userWidgets2);
        userWidgets1.setId(null);
        assertThat(userWidgets1).isNotEqualTo(userWidgets2);
    }
}
