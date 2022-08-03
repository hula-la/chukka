package com.ssafy.common.util;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
public class MailUtil {

    private String address;
    private String title;
    private String content;

}
