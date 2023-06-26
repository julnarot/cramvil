# Tasks_resource

## run application
```bash
./gradlew bootRun
```


## Create `Resource owner password` grant type oauth application

* Go in your browser `http://127.0.0.1:8000/o/applications/register/` for register a new application
* Assign name application
* Copy clientId and clientSecret values for setup in properties file
* Select `Confidential` option on Client Type selector
* Select `Resource owner password-based` option on Authorization grant type selector
### Example
![Drag Racing](https://github.com/julnarot/general-public-assets/blob/main/screenshots/oauth_resource_own_pass_grant_type_confi_application001.PNG?raw=true)

## Retrieve principal user detail endpoint

Try `testing-secured` endpoint, don't forget  generate `token` on auth_server auth provider application

```bash
curl --location 'http://localhost:8080/testing-secured' \
--header 'Authorization: Bearer poELSihd62BTaKSmtarzbAoR7yXVeL' \
--header 'Cookie: JSESSIONID=3DAC78DC2FD1433812495906674A7A2A'
```