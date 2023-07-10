package com.julnarot.tasks_resource.task;

import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;

import java.security.Principal;
import java.util.List;

import org.springframework.security.oauth2.server.resource.authentication.BearerTokenAuthentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/task")
@RequiredArgsConstructor
public class TaskController {
    private final TaskRepository taskRepository;

    @GetMapping
    public List<Task> getTasks(BearerTokenAuthentication bearerAuthentication) {
        String username = bearerAuthentication.getTokenAttributes().get("username").toString();
        return taskRepository.getTasksByUsername(username);
    }

    @PostMapping
    public Task saveTask(BearerTokenAuthentication bearerAuthentication, @RequestBody Task task) {
        String username = bearerAuthentication.getTokenAttributes().get("username").toString();
        task.setUsername(username);
        return taskRepository.save(task);
    }

}
