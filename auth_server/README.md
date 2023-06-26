# AUTH_SERVER
## Activate local environment

```bash
python3 -m pipenv shell
```

## run application
```bash
python manage.py runserver
```


## Create authorization grant type oauth application

* Go in your browser `http://127.0.0.1:8000/o/applications/register/` for register a new application
* Assign name application
* Copy clientId and clientSecret values
* Select `Public` option on Client Type selector
* Select `Authorization code` option on Authorization  grant type selector
* Put address of client when tramite token with code like to `http://localhost:4200/...../callback`
### Example
![Drag Racing](https://raw.githubusercontent.com/julnarot/general-public-assets/main/screenshots/oauth_authorization_code_grant_type_application001.PNG)
