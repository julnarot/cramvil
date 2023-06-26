package com.julnarot.tasks_resource.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class SecurityUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userAccountRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User userAccount = userAccountRepository.getUserByUsername(username);
        if (userAccount == null) {
            throw new UsernameNotFoundException("could not find user");
        }
        return new SecurityUser(userAccount);
    }

}
