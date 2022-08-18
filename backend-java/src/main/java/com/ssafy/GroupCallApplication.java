package com.ssafy;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.filter.CharacterEncodingFilter;

import javax.annotation.PostConstruct;
import java.io.File;
import java.nio.charset.StandardCharsets;

@SpringBootApplication
public class GroupCallApplication {

    @Value("${spring.file-dir")
    private String fileDir;

    @PostConstruct
    private void init() {
        String filesFolder = "/var/www/html/files";
        mkdirResource(filesFolder);
    }

    private static void mkdirResource(String fileDir) {
        File folder = new File(fileDir);
        if(!folder.exists()) {
            try {
                folder.mkdir();
            } catch (Exception e) {
                e.getStackTrace();
            }
        }
    }
    public static final String APPLICATION_LOCATIONS = "spring.config.location="
            + "classpath:application.yml,"
            + "classpath:application-hide.yml";

	public static void main(String[] args) {
        new SpringApplicationBuilder(GroupCallApplication.class)
                .properties(APPLICATION_LOCATIONS)
                .run(args);
    }

    @Bean
    public HttpMessageConverter<String> responseBodyConverter() {
        return new StringHttpMessageConverter(StandardCharsets.UTF_8);
    }

    @Bean
    public CharacterEncodingFilter characterEncodingFilter() {
        CharacterEncodingFilter characterEncodingFilter = new CharacterEncodingFilter();
        characterEncodingFilter.setEncoding("UTF-8");
        characterEncodingFilter.setForceEncoding(true);
        return characterEncodingFilter;
    }
}
