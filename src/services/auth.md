# API дока

## Endpoints

### 1. Register

- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Body:**
    ```json
    {
        "email": "user@example.com",
        "username": "string",
        "password": "string"
    }
    ```
- **Response:**
    - `201 Created` Успех
    - `400 Bad Request` Получаем ошибку в теле
    - `409 Conflict` Пользователь уже существует

---

### 2. Login

- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Body:**
    ```json
    {
        "email": "user@example.com",
        "password": "string"
    }
    ```
- **Response:**
    - `200 OK` Получаем JWT токен
    - `401 Unauthorized` Получаем ошибку в теле

---

### 3. Password Recovery (Запрос изменения)

- **URL:** `/api/auth/forgot-password`
- **Method:** `POST`
- **Body:**
    ```json
    {
        "email": "user@example.com"
    }
    ```
- **Response:**
    - `200 OK` Успех
    - `400 Bad Request` Слишком частые попытки или другая ошибка
    - `404 Not Found` Пользователь не найден

---

### 4. Password Reset (Подтверждение изменения)

- **URL:** `/api/auth/reset-password`
- **Method:** `POST`
- **Body:**
    ```json
    {
        "token": "reset-token",
        "newPassword": "string"
    }
    ```
- **Response:**
    - `200 OK` Успех
    - `400 Bad Request` on invalid token
