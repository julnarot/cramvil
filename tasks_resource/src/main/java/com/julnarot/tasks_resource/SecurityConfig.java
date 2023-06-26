package com.julnarot.tasks_resource;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import com.julnarot.tasks_resource.user.SecurityUserDetailsService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JdbcTokenStore;
import org.springframework.security.oauth2.server.resource.introspection.NimbusOpaqueTokenIntrospector;
import org.springframework.security.oauth2.server.resource.introspection.OpaqueTokenIntrospector;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    @Value("${spring.security.oauth2.resourceserver.opaque.introspection-uri}")
    String introspectionUri;

    @Value("${spring.security.oauth2.resourceserver.opaque.introspection-client-id}")
    String clientId;

    @Value("${spring.security.oauth2.resourceserver.opaque.introspection-client-secret}")
    String clientSecret;

    @Bean
    public UserDetailsService userDetailsService() {
        UserDetailsService userDetailsService = new SecurityUserDetailsService();
        return userDetailsService;
    }

    @Bean
    OpaqueTokenIntrospector opaqueTokenIntrospector() {
        OpaqueTokenIntrospector opaqueTokenIntrospector = new NimbusOpaqueTokenIntrospector(this.introspectionUri,
                this.clientId, this.clientSecret);
        return opaqueTokenIntrospector;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeRequests(authz -> authz.requestMatchers(HttpMethod.GET, "/bars/**")
                .hasAuthority("read write")
                .anyRequest()
                .authenticated())
                .oauth2ResourceServer(
                        oauth2 -> oauth2.opaqueToken(token -> token.introspectionUri(this.introspectionUri)
                                .introspector(opaqueTokenIntrospector())));
        http.cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues());
        return http.build();
    }

    @Autowired
    private DataSource dataSource;

    @Bean
    public TokenStore tokenStore() {
        return new JdbcTokenStore(dataSource);
    }

    public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
        resources.tokenStore(tokenStore());
    }

    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder.userDetailsService(userDetailsService());
    }
}
